package com.fpt.edu.service;

import com.fpt.edu.entity.AuctionSession;

import java.time.LocalDate;

public interface IAuctionSessionService {


    AuctionSession createSession(String name, String description, LocalDate startDate, LocalDate startingBid, int staffId);
}
