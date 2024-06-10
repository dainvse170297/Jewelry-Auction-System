package com.fpt.edu.service;

import com.fpt.edu.dto.AuctionSessionDTO;
import com.fpt.edu.entity.AuctionSession;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

public interface IAuctionSessionService {

    List<AuctionSession> getAllAuctionSession();

    AuctionSession createSession(String name, String description, LocalDateTime startDate, LocalDateTime endDate, LocalDateTime startingBid, int staffId, MultipartFile image) throws IOException;

    List<AuctionSession> getAllAuctionSessionByCreatedStatus();

    AuctionSession addLotToSession(int lotId, int sessionId);

    AuctionSession getAuctionSessionById(int id);

    List<AuctionSessionDTO> getUpcomingAuctionSession();
}
