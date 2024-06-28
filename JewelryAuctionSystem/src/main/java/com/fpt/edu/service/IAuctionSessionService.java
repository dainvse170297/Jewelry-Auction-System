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
import java.util.Map;

public interface  IAuctionSessionService {

    List<AuctionSessionDTO> getAllAuctionSession();

    AuctionSessionDTO createSession(String name, String description, LocalDateTime startDate, LocalDateTime endDate, LocalDateTime startingBid, int staffId, MultipartFile image) throws IOException;

    List<AuctionSessionDTO> getAllAuctionSessionByCreatedStatus();

    AuctionSession addLotToSession(int lotId, int sessionId);

    AuctionSessionDTO getAuctionSessionById(int id);

    List<AuctionSessionDTO> getAuctionSession(AuctionSessionStatus status);

    ResponseEntity<?> viewLiveAuctionSessionDetail(Integer sessionId, Integer memberId);

    Map<String, Object> getAuctionSessionDetails(Integer sessionId, Integer memberId);


    AuctionSessionDTO publicAuctionSession(Integer sessionId);
}
