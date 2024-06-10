package com.fpt.edu.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fpt.edu.dto.AuctionSessionDTO;
import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.dto.ViewLiveAuctionSessionDetailDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.AuctionSessionMapper;
=
import com.fpt.edu.repository.AuctionSessionRepository;
import com.fpt.edu.repository.IAuctionRegisterRepository;
import com.fpt.edu.repository.ILotRepository;
import com.fpt.edu.repository.IStaffRepository;
import com.fpt.edu.status.AuctionSessionStatus;
import com.fpt.edu.status.LotStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuctionSessionService implements IAuctionSessionService {
    private final AuctionSessionRepository auctionSessionRepository;
    private final StaffRepository staffRepository;
    private final ILotRepository lotRepository;
    private final IAuctionRegisterRepository auctionRegisterRepository;
    private final AuctionSessionMapper auctionSessionMapper;

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
        if (image != null || image.getBytes().length != 0 || image.isEmpty() == false){
            byte[] imageByte = image.getBytes();
            Map r = cloudinary.uploader().upload(imageByte, ObjectUtils.emptyMap());
            auctionSession.setImage((String) r.get("url"));
        }else{
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
    public List<AuctionSessionDTO> getUpcomingAuctionSession() {
        return auctionSessionMapper.toAuctionSessionDTOList(auctionSessionRepository.findByStatus(AuctionSessionStatus.UPCOMING));
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
        if (check){
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
                lotDTO.setStatus(lot.getStatus().toString());
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
        }else {
            return ResponseEntity.badRequest().build();
        }

    }

}
