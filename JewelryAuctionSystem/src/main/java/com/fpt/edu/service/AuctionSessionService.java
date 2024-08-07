package com.fpt.edu.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fpt.edu.dto.*;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.AuctionRegisterMapper;
import com.fpt.edu.mapper.AuctionSessionMapper;
import com.fpt.edu.mapper.LotMapper;
import com.fpt.edu.mapper.ProductMapper;
import com.fpt.edu.repository.*;
import com.fpt.edu.status.AuctionRegisterStatus;
import com.fpt.edu.status.AuctionSessionStatus;
import com.fpt.edu.status.LotStatus;
import com.fpt.edu.status.NotifyType;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuctionSessionService implements IAuctionSessionService {
    private static final Logger log = LoggerFactory.getLogger(AuctionSessionService.class);
    private final ILotRepository lotRepository;
    private final IStaffRepository staffRepository;
    private final IAuctionSessionRepository auctionSessionRepository;
    private final IAuctionRegisterRepository auctionRegisterRepository;
    private final ILotRepository iLotRepository;
    private final IMemberRepository iMemberRepository;
    private final IProductRepository productRepository;
    private final ProductMapper productMapper;
    private final AuctionSessionMapper auctionSessionMapper;
    private final AuctionRegisterMapper auctionRegisterMapper;
    private final LotMapper lotMapper;
    private final Cloudinary cloudinary;
    private final INotifyService iNotifyService;
    private final InvalidatedTokenRepository invalidatedTokenRepository;

    @Override
    public List<AuctionSessionDTO> getAllAuctionSession() {
        return auctionSessionMapper.toAuctionSessionDTOList(auctionSessionRepository.findAll());
    }

    @Override
    public AuctionSessionDTO createSession(String name,
                                           String description,
                                           LocalDateTime startDate,
                                           LocalDateTime endDate,
                                           LocalDateTime startingBid,
                                           int staffId,
                                           MultipartFile image) throws IOException {
        Staff staff = staffRepository.findById(staffId).get();
        AuctionSession auctionSession = new AuctionSession();
        auctionSession.setName(name);
        auctionSession.setDescription(description);
        auctionSession.setStartTime(startDate);
        auctionSession.setEndTime(endDate);
        auctionSession.setStartingBid(startingBid);
        auctionSession.setStaff(staff);
        auctionSession.setStatus(AuctionSessionStatus.CREATED);
        if (image != null || image.getBytes().length != 0 || image.isEmpty() == false) {
            byte[] imageByte = image.getBytes();
            Map r = cloudinary.uploader().upload(imageByte, ObjectUtils.emptyMap());
            auctionSession.setImage((String) r.get("url"));
        } else {
            auctionSession.setImage("https://www.fortunaauction.com/wp-content/uploads/2019/12/Upcoming-Auction-Placeholder-Template.jpg");
        }
        auctionSessionRepository.save(auctionSession);

        return auctionSessionMapper.toAuctionSessionDTO(auctionSession);
    }

    @Override
    public AuctionSessionDTO updateSession(int sessionId,
                                           String name,
                                           String description,
                                           LocalDateTime startDate,
                                           LocalDateTime endDate,
                                           LocalDateTime startingBid,
                                           int staffId) {
        AuctionSession editAuctionSession = auctionSessionRepository.findById(sessionId).orElseThrow(() -> new RuntimeException("Auction session not found"));
        editAuctionSession.setName(name);
        editAuctionSession.setDescription(description);
        editAuctionSession.setStartTime(startDate);
        editAuctionSession.setEndTime(endDate);
        editAuctionSession.setStartingBid(startingBid);
        editAuctionSession.setStaff(staffRepository.findById(staffId).get());
        auctionSessionRepository.save(editAuctionSession);
        return auctionSessionMapper.toAuctionSessionDTO(editAuctionSession);
    }

    @Override
    public List<AuctionSessionDTO> getAllAuctionSessionByCreatedStatus() {
        List<AuctionSession> listCreatedAuctionSessions = auctionSessionRepository.findByStatus(AuctionSessionStatus.CREATED);

        return auctionSessionMapper.toAuctionSessionDTOList(listCreatedAuctionSessions);
    }

    @Override
    public AuctionSession addLotToSession(int lotId, int sessionId) {
        Lot lot = lotRepository.findById(lotId).get();
        AuctionSession auctionSession = auctionSessionRepository.findById(sessionId).get();
        lot.setAuctionSession(auctionSession);
        lot.setStatus(LotStatus.AUCTIONING);
        lotRepository.save(lot);
        return auctionSession;
    }

    @Override
    public AuctionSessionDTO getAuctionSessionById(int id) {
        return auctionSessionMapper.toAuctionSessionDTO(auctionSessionRepository.findById(id).get());
    }

    @Override
    public List<AuctionSessionDTO> getAuctionSession(AuctionSessionStatus status) {
        return auctionSessionMapper.toAuctionSessionDTOList(auctionSessionRepository.findByStatus(status));
    }


    @Override
    public ResponseEntity<ViewLiveAuctionSessionDetailDTO> viewLiveAuctionSessionDetail(Integer sessionId, Integer memberId) {
        AuctionRegisterStatus statusRegister = AuctionRegisterStatus.REGISTERED;
        LotStatus statusLot = LotStatus.AUCTIONING;

        List<AuctionRegister> auctionRegisters = auctionRegisterRepository.findAuctionRegisterByMemberIdAndStatus(memberId, statusRegister);
        //  auctionRegisters.addAll(auctionRegisterRepository.findAuctionRegisterByMemberIdAndStatus(memberId, AuctionRegisterStatus.REGISTERED));

        List<Lot> lots = auctionRegisters.stream()
                .map(AuctionRegister::getLot)
                .collect(Collectors.toList());


        List<Lot> lotOfSession = lotRepository.findByAuctionSession_IdAndStatus(sessionId, statusLot);
        for (Lot lot : lotOfSession) {
            System.out.println(lot.getId());
        }
        ViewLiveAuctionSessionDetailDTO viewLiveAuctionSessionDetailDTO = new ViewLiveAuctionSessionDetailDTO();
        AuctionSession auctionSession = auctionSessionRepository.findById(sessionId).get();
        viewLiveAuctionSessionDetailDTO.setId(auctionSession.getId());
        viewLiveAuctionSessionDetailDTO.setStaffId(auctionSession.getStaff().getId());
        viewLiveAuctionSessionDetailDTO.setStartTime(auctionSession.getStartTime());
        viewLiveAuctionSessionDetailDTO.setEndTime(auctionSession.getEndTime());

        Set<LotDTO> listLotDTO = new HashSet<>();

        LotMapper lotMapper = new LotMapper();
        for (Lot lot : lotOfSession) {
            for (Lot lotRegister : lots) {
                if (lot.getId().equals(lotRegister.getId())) {
                    LotDTO lotDTO = lotMapper.toLotDTO(lotRegister);
                    listLotDTO.add(lotDTO);
                }
            }
        }
        viewLiveAuctionSessionDetailDTO.setName(auctionSession.getName());
        viewLiveAuctionSessionDetailDTO.setDescription(auctionSession.getDescription());
        viewLiveAuctionSessionDetailDTO.setStatus(auctionSession.getStatus());
        viewLiveAuctionSessionDetailDTO.setLots(listLotDTO);
        return ResponseEntity.ok(viewLiveAuctionSessionDetailDTO);

    }

    @Override
    public Map<String, Object> getAuctionSessionDetails(Integer sessionId, Integer memberId) {
        AuctionSession auctionSession = auctionSessionRepository.getReferenceById(sessionId);
        AuctionSessionDTO auctionSessionDTO = auctionSessionMapper.toAuctionSessionDTO(auctionSession);
        List<Lot> lots = lotRepository.findByAuctionSession_Id(sessionId);
        List<LotDTO> lotDTOS = new ArrayList<>();
        for (Lot lot : lots) {
            LotDTO lotDTO = lotMapper.toLotDTO(lot);
            lotDTOS.add(lotDTO);
        }
        List<AuctionRegister> registers = auctionRegisterRepository.findByMemberId(memberId);
        List<AuctionRegisterDTO> registerDTOS = auctionRegisterMapper.toAuctionRegisterDTOList(registers);
        Map<String, Object> map = new HashMap<>();
        map.put("Lots", lotDTOS);
        map.put("AuctionSession", auctionSessionDTO);
        map.put("Registers", registerDTOS);
        return map;
    }

    @Override
    public ViewLiveAuctionSessionDetailDTO getPastAuctionSessionDetail(Integer sessionId) {
        AuctionSession auctionSession = auctionSessionRepository.findById(sessionId).get();
        ViewLiveAuctionSessionDetailDTO viewLiveAuctionSessionDetailDTO = new ViewLiveAuctionSessionDetailDTO();
        viewLiveAuctionSessionDetailDTO.setId(auctionSession.getId());
        viewLiveAuctionSessionDetailDTO.setStaffId(auctionSession.getStaff().getId());
        viewLiveAuctionSessionDetailDTO.setStartTime(auctionSession.getStartTime());
        viewLiveAuctionSessionDetailDTO.setEndTime(auctionSession.getEndTime());
        viewLiveAuctionSessionDetailDTO.setName(auctionSession.getName());
        viewLiveAuctionSessionDetailDTO.setDescription(auctionSession.getDescription());
        viewLiveAuctionSessionDetailDTO.setStatus(auctionSession.getStatus());
        Set<Lot> lots = auctionSession.getLots();
        Set<LotDTO> lotDTOS = new HashSet<>();
        for (Lot lot : lots) {
            LotDTO lotDTO = new LotDTO();
            lotDTO.setId(lot.getId());
            lotDTO.setProductId(lot.getProduct().getId());
            lotDTO.setProductName(lot.getProduct().getName());
            lotDTO.setCurrentPrice(lot.getCurrentPrice());
            lotDTO.setEstimatePriceMin(lot.getProduct().getEstimatePriceMin());
            lotDTO.setEstimatePriceMax(lot.getProduct().getEstimatePriceMax());
            lotDTO.setStatus(lot.getStatus());
            lotDTO.setProductImages(lot.getProduct().getProductImages());
            lotDTO.setPaymentInfoDTO(new PaymentInfoDTO());
            lotDTOS.add(lotDTO);
        }
        viewLiveAuctionSessionDetailDTO.setLots(lotDTOS);
        return viewLiveAuctionSessionDetailDTO;
    }


    @Override
    public AuctionSessionDTO publicAuctionSession(Integer sessionId) {
        AuctionSession auctionSession = auctionSessionRepository.findById(sessionId).get();
        auctionSession.setStatus(AuctionSessionStatus.UPCOMING);
        auctionSession.setStartingBid(LocalDateTime.now());
        auctionSessionRepository.save(auctionSession);
        return auctionSessionMapper.toAuctionSessionDTO(auctionSession);
    }

    @Override
    public List<AuctionSessionDTO> getAuctionSessionByStaffId(Integer staffId) {
        return auctionSessionMapper.toAuctionSessionDTOList(auctionSessionRepository.findByStaffId(staffId));
    }

    public List<AuctionSession> getAuctionSessions(AuctionSessionStatus status) {
        return auctionSessionRepository.findByStatus(status);
    }

    @Scheduled(fixedRate = 10000) // This will run the method every 10 seconds
    public void updateSessionStatusLive() {
        List<AuctionSession> upcomingSessions = getAuctionSessions(AuctionSessionStatus.UPCOMING);
        LocalDateTime now = LocalDateTime.now();
        for (AuctionSession session : upcomingSessions) {
            if (!session.getStartTime().isAfter(now) && !session.getEndTime().isBefore(now)) { // if the current time is between the start and end time
                List<Lot> lots = iLotRepository.findByAuctionSession(session);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss dd/MM/yyyy");
                for (Lot lot : lots) {
                    List<AuctionRegister> registers = auctionRegisterRepository.findByLot(lot);
                    for (AuctionRegister register : registers) {
                        Member member = register.getMember();
                        iNotifyService.insertNotify(member,
                                "Lot: " + lot.getProduct().getName() + " is live now",
                                "Lot: " + lot.getProduct().getName() + " is live now in " + session.getName() + " at " + session.getStartTime().format(formatter) + " to " + session.getEndTime().format(formatter)
                                , NotifyType.LIVE_LOT, lot.getId());
                    }
                }
                session.setStatus(AuctionSessionStatus.LIVE);
                auctionSessionRepository.save(session);
            }
        }
    }

    @Scheduled(fixedRate = 10000) // This will run the method every 10 seconds
    public void updateSessionStatusPast() {
        List<AuctionSession> liveSessions = getAuctionSessions(AuctionSessionStatus.LIVE);
        List<AuctionSession> upcomingSessions = getAuctionSessions(AuctionSessionStatus.UPCOMING);
        upcomingSessions.addAll(liveSessions);
        LocalDateTime now = LocalDateTime.now();
        for (AuctionSession session : upcomingSessions) {
            if (session.getEndTime().isBefore(now)) { // if the current time is after the end time
                List<Lot> lots = iLotRepository.findByAuctionSession(session);
                for (Lot lot : lots) {
                    if (lot.getStatus().equals(LotStatus.AUCTIONING)) {
                        if (lot.getCurrentWinnerId() != null) {
                            Member winner = iMemberRepository.getReferenceById(lot.getCurrentWinnerId());
                            iNotifyService.insertNotify(winner,
                                    "You win the lot: " + lot.getProduct().getName(),
                                    "You win the lot: " + lot.getProduct().getName() + " in " + session.getName() + " with the price of ₫" + lot.getCurrentPrice(),
                                    NotifyType.WINNER, lot.getId());
                            AuctionRegister register = auctionRegisterRepository.findByLotIdAndMemberId(lot.getId(), lot.getCurrentWinnerId());
                            //   System.out.println(register.getId() + " " + register.getFinalPrice() + " " + lot.getCurrentPrice() + " " + lot.getProduct().getName() + " " + lot.getId());
                            register.setStatus(AuctionRegisterStatus.PENDING_PAYMENT);
                            auctionRegisterRepository.save(register);
                            lot.setStatus(LotStatus.SOLD);
                            iLotRepository.save(lot);
                            //update everyone else financial proof amount
                            List<AuctionRegister> auctionRegisters = auctionRegisterRepository.findByLotId(lot.getId());
                            for (AuctionRegister auctionRegister1 : auctionRegisters) {
                                if (auctionRegister1.getMember().getId() != lot.getCurrentWinnerId()) {
                                    Member member1 = auctionRegister1.getMember();
                                    if (member1.getFinancialProofAmount() != null && auctionRegister1.getCurrentPrice() != null) {
                                        member1.setFinancialProofAmount(member1.getFinancialProofAmount().add(auctionRegister1.getCurrentPrice()));
                                        iMemberRepository.save(member1);
                                    }
                                }
                            }
                        } else {
                            lot.setStatus(LotStatus.READY);
                            iLotRepository.save(lot);
                        }
                    }else {
                        // Sold lot already
                    }
                }
                session.setStatus(AuctionSessionStatus.PAST);
                auctionSessionRepository.save(session);
            }
        }
    }

    @Scheduled(fixedRate = 1000 * 60 * 5)
    public void deleteTokenInvalidated() {
        List<InvalidatedToken> invalidatedTokens = invalidatedTokenRepository.findAll();
        LocalDateTime now = LocalDateTime.now();
        for (InvalidatedToken invalidatedToken : invalidatedTokens) {
            if (invalidatedToken.getExpiredTime().isBefore(now)) {
                invalidatedTokenRepository.delete(invalidatedToken);
                log.info("Delete token invalidated");
            }
        }
    }


}
