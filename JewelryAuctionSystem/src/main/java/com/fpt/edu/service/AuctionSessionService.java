package com.fpt.edu.service;

import com.fpt.edu.dto.AuctionSessionDTO;
import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.entity.Staff;
import com.fpt.edu.mapper.AuctionSessionM;
import com.fpt.edu.repository.AuctionSessionRepository;
import com.fpt.edu.repository.StaffRepository;
import com.fpt.edu.status.AuctionSessionStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuctionSessionService implements IAuctionSessionService{
    private final AuctionSessionRepository auctionSessionRepository;
    private final StaffRepository staffRepository;
    @Autowired
    private AuctionSessionRepository sessionRepository;

    @Override
    public AuctionSessionDTO createAuctionSession(AuctionSessionDTO auctionSessionDTO) {
        AuctionSession auctionSession = AuctionSessionM.maptoEntity(auctionSessionDTO);
        auctionSession.setStatus(AuctionSessionStatus.CREATED);
        auctionSession=sessionRepository.save(auctionSession);
        return AuctionSessionM.mapToDTO(auctionSession);
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
}
