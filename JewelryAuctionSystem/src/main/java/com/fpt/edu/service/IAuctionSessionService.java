package com.fpt.edu.service;

import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.status.AuctionRegisterStatus;
import com.fpt.edu.status.AuctionSessionStatus;

import java.time.LocalDate;
import java.util.List;

public interface IAuctionSessionService {

    List<AuctionSession> getAllAuctionSession();

    AuctionSession createSession(String name, String description, LocalDate startDate, LocalDate startingBid, int staffId);

    List<AuctionSession> getAllAuctionSessionByCreatedStatus();
}
