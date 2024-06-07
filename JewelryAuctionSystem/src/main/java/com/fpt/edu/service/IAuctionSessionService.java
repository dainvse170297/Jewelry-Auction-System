package com.fpt.edu.service;

import com.fpt.edu.dto.AuctionSessionDTO;
import com.fpt.edu.entity.AuctionSession;

import java.time.LocalDate;

public interface IAuctionSessionService {


    public AuctionSessionDTO createAuctionSession(AuctionSessionDTO auctionSessionDTO);
    AuctionSession createSession(String name, String description, LocalDate startDate, LocalDate startingBid, int staffId);
}
