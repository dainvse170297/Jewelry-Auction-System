package com.fpt.edu.service;

import com.fpt.edu.dto.AuctionSessionDTO;
import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.entity.Staff;
import com.fpt.edu.mapper.AuctionSessionMapper;
import com.fpt.edu.repository.IAuctionSessionRepository;
import com.fpt.edu.repository.ILotRepository;
import com.fpt.edu.repository.IStaffRepository;
import com.fpt.edu.status.AuctionSessionStatus;
import com.fpt.edu.status.LotStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuctionSessionService implements IAuctionSessionService{
    private final IAuctionSessionRepository auctionSessionRepository;
    private final IStaffRepository staffRepository;
    private final ILotRepository lotRepository;

    private final AuctionSessionMapper auctionSessionMapper;

    @Override
    public List<AuctionSession> getAllAuctionSession() {
        return auctionSessionRepository.findAll();
    }

    @Override
    public AuctionSession createSession(String name, String description, LocalDate startDate, LocalDate startingBid, int staffId) {
        Staff staff = staffRepository.findById(staffId).get();
        AuctionSession auctionSession = new AuctionSession();
        auctionSession.setName(name);
        auctionSession.setDescription(description);
        auctionSession.setStartTime(startDate);
        auctionSession.setStartingBid(startingBid);
        auctionSession.setStaff(staff);
        auctionSession.setStatus(AuctionSessionStatus.CREATED);
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
