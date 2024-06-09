package com.fpt.edu.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fpt.edu.dto.AuctionSessionDTO;
import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.entity.Staff;
import com.fpt.edu.mapper.AuctionSessionMapper;
import com.fpt.edu.repository.AuctionSessionRepository;
import com.fpt.edu.repository.ILotRepository;
import com.fpt.edu.repository.StaffRepository;
import com.fpt.edu.status.AuctionRegisterStatus;
import com.fpt.edu.status.AuctionSessionStatus;
import com.fpt.edu.status.LotStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuctionSessionService implements IAuctionSessionService{
    private final AuctionSessionRepository auctionSessionRepository;
    private final StaffRepository staffRepository;
    private final ILotRepository lotRepository;
    private final Cloudinary cloudinary;
    private final AuctionSessionMapper auctionSessionMapper;

    @Override
    public List<AuctionSession> getAllAuctionSession() {
        return auctionSessionRepository.findAll();
    }

    @Override
    public AuctionSession createSession(String name, String description, LocalDate startDate,LocalDate endDate, LocalDate startingBid, int staffId, MultipartFile image) throws IOException {
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

}
