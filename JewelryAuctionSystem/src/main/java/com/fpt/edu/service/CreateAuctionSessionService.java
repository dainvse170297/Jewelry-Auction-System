package com.fpt.edu.service;

import com.fpt.edu.dto.AuctionSessionDTO;
import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.enums.AuctionSessionStatus;
import com.fpt.edu.mapper.AuctionSessionM;
import com.fpt.edu.repository.AuctionSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateAuctionSessionService implements ICreateAuctionSessionService {
    @Autowired
    private AuctionSessionRepository sessionRepository;

    public AuctionSessionDTO createAuctionSession( AuctionSessionDTO auctionSessionDTO) {
        AuctionSession auctionSession = AuctionSessionM.maptoEntity(auctionSessionDTO);
        auctionSession.setStatus(AuctionSessionStatus.CREATED);
        auctionSession=sessionRepository.save(auctionSession);
        return AuctionSessionM.mapToDTO(auctionSession);
    }

}
