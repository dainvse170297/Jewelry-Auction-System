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
import lombok.RequiredArgsConstructor;
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
    private final ILotRepository lotRepository;
    private final IStaffRepository staffRepository;
    private final IAuctionSessionRepository auctionSessionRepository;
    private final IAuctionRegisterRepository auctionRegisterRepository;
    private final ILotRepository iLotRepository;
    private final IProductRepository productRepository;
    private final ProductMapper productMapper;
    private final AuctionSessionMapper auctionSessionMapper;
    private final AuctionRegisterMapper auctionRegisterMapper;
    private final LotMapper lotMapper;
    private final Cloudinary cloudinary;
    private final INotifyService iNotifyService;

    @Override
    public List<AuctionSession> getAllAuctionSession() {
        return auctionSessionRepository.findAll();
    }

    @Override
    public AuctionSession createSession(String name, String description, LocalDateTime startDate, LocalDateTime endDate, LocalDateTime startingBid, int staffId, MultipartFile image) throws IOException {
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

        return auctionSession;
    }

    @Override
    public List<AuctionSession> getAllAuctionSessionByCreatedStatus() {
        return auctionSessionRepository.findByStatus(AuctionSessionStatus.CREATED);
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
    public AuctionSession getAuctionSessionById(int id) {
        return auctionSessionRepository.findById(id).get();
    }

    @Override
    public List<AuctionSessionDTO> getAuctionSession(AuctionSessionStatus status) {
        return auctionSessionMapper.toAuctionSessionDTOList(auctionSessionRepository.findByStatus(status));
    }

    @Override
    public boolean authByMember(Integer sessionId, Integer memberId) {
        AuctionRegisterStatus status = AuctionRegisterStatus.BID;

        List<AuctionRegister> auctionRegisters = auctionRegisterRepository.findAuctionRegisterByMemberIdAndStatus(memberId, status);
        List<Lot> lots = auctionRegisters.stream()
                .map(AuctionRegister::getLot)
                .collect(Collectors.toList());
        // lấy ds lots cua session
        List<Lot> lotOfSession = lotRepository.findByAuctionSession_Id(sessionId);
        boolean check = false;
        for (Lot lot : lotOfSession) {
            for (Lot lotRegister : lots) {
                if (lot.getId() == lotRegister.getId()) {
                    check = true;
                    break;
                }
            }
        }
        return check;
    }

    @Override
    public ResponseEntity<?> viewLiveAuctionSessionDetail(Integer sessionId, Integer memberId) {
        AuctionRegisterStatus status = AuctionRegisterStatus.BID;

        boolean check = authByMember(sessionId, memberId);
        if (check) {
            AuctionSession auctionSession = auctionSessionRepository.findById(sessionId).get();
            ViewLiveAuctionSessionDetailDTO viewLiveAuctionSessionDetailDTO = new ViewLiveAuctionSessionDetailDTO();
            viewLiveAuctionSessionDetailDTO.setId(auctionSession.getId());
            viewLiveAuctionSessionDetailDTO.setStaffId(auctionSession.getStaff().getId());
            viewLiveAuctionSessionDetailDTO.setStartTime(auctionSession.getStartTime());
            viewLiveAuctionSessionDetailDTO.setEndTime(auctionSession.getEndTime());

            //LocalDateTime now = LocalDateTime.now();
            //Duration duration = Duration.between(now, auctionSession.getEndTime());
            //long hours = duration.toHours();
            //  long minutes = duration.toMinutesPart();
            // long seconds = duration.toSecondsPart();

            // LocalDateTime countdownTime = now.minusHours(hours).minusMinutes(minutes).minusSeconds(seconds);
            //  viewLiveAuctionSessionDetailDTO.setCountdownTime(countdownTime);

            List<Lot> lots = lotRepository.findByAuctionSession(auctionSession);

            List<LotDTO> listLotDTO = new ArrayList<>();

            for (Lot lot : lots) {
                LotDTO lotDTO = new LotDTO();
                lotDTO.setId(lot.getId());
                lotDTO.setProductId(lot.getProduct().getId());
                lotDTO.setProductName(lot.getProduct().getName());
                lotDTO.setCurrentPrice(lot.getCurrentPrice());
                lotDTO.setStatus(lot.getStatus());
                lotDTO.setNumberOfRegister(auctionRegisterRepository.countByLotIdAndStatus(lot.getId(), status));
                List<ProductImage> productImages = new ArrayList<>(lot.getProduct().getProductImages());
                lotDTO.setProductImages(productImages);
                listLotDTO.add(lotDTO);
            }

            viewLiveAuctionSessionDetailDTO.setName(auctionSession.getName());
            viewLiveAuctionSessionDetailDTO.setDescription(auctionSession.getDescription());
            viewLiveAuctionSessionDetailDTO.setStatus(auctionSession.getStatus());
            viewLiveAuctionSessionDetailDTO.setLots(listLotDTO);
            return ResponseEntity.ok(viewLiveAuctionSessionDetailDTO);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    public Map<String, Object> getAuctionSessionDetails(Integer sessionId, Integer memberId) {
        AuctionSession auctionSession = auctionSessionRepository.getReferenceById(sessionId);
        AuctionSessionDTO auctionSessionDTO = auctionSessionMapper.toAuctionSessionDTO(auctionSession);
        List<Lot> lots = lotRepository.findByAuctionSession_Id(sessionId);
        List<LotDTO> lotDTOS = new ArrayList<>();
        for (Lot lot : lots) {
            LotDTO lotDTO = lotMapper.toLotDTODetail(lot, lot.getProduct().getEstimatePriceMin(), lot.getProduct().getEstimatePriceMax());
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
                                "Lot: " + lot.getProduct().getName() + " is live now in " + session.getName() + " at " + session.getStartTime().format(formatter) + " to " + session.getEndTime().format(formatter));
                    }
                }
                session.setStatus(AuctionSessionStatus.LIVE);
                auctionSessionRepository.save(session);
            }
        }
    }

    @Scheduled(fixedRate = 10000) // This will run the method every 10 seconds
    public void updateSessionStatusPast() {
        List<AuctionSession> upcomingSessions = getAuctionSessions(AuctionSessionStatus.LIVE);
        LocalDateTime now = LocalDateTime.now();
        for (AuctionSession session : upcomingSessions) {
            if (session.getEndTime().isBefore(now)) { // if the current time is after the end time
                session.setStatus(AuctionSessionStatus.PAST);
                auctionSessionRepository.save(session);
            }
        }
    }
}
