package com.fpt.edu.service;

import com.fpt.edu.dto.AuctionSessionDTO;
import com.fpt.edu.dto.ViewLiveAuctionSessionDetailDTO;
import com.fpt.edu.entity.AuctionSession;
import org.springframework.web.multipart.MultipartFile;
import com.fpt.edu.status.AuctionRegisterStatus;
import com.fpt.edu.status.AuctionSessionStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

public interface  IAuctionSessionService {

    List<AuctionSession> getAllAuctionSession();

    AuctionSession createSession(String name, String description, LocalDateTime startDate, LocalDateTime endDate, LocalDateTime startingBid, int staffId, MultipartFile image) throws IOException;

    List<AuctionSession> getAllAuctionSessionByCreatedStatus();

    AuctionSession addLotToSession(int lotId, int sessionId);

    AuctionSession getAuctionSessionById(int id);

    List<AuctionSessionDTO> getUpcomingAuctionSession();

    ResponseEntity<?> viewLiveAuctionSessionDetail(Integer sessionId, Integer memberId);

    boolean authByMember(Integer sessionId, Integer memberId);
}
