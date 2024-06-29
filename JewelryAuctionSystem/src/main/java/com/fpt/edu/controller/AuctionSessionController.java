package com.fpt.edu.controller;

import com.fpt.edu.dto.AuctionSessionDTO;
import com.fpt.edu.dto.ViewLiveAuctionSessionDetailDTO;
import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.service.IAuctionSessionService;
import com.fpt.edu.status.AuctionSessionStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/auction")
@RequiredArgsConstructor
public class AuctionSessionController {

    private final IAuctionSessionService auctionSessionService;

    @PostMapping("/create-session")
    public ResponseEntity<AuctionSessionDTO> createAuctionSession(@RequestParam("name") String name,
                                                               @RequestParam("description") String description,
                                                               @RequestParam("startTime") LocalDateTime startDate,
                                                               @RequestParam("endTime") LocalDateTime endDate,
                                                               @RequestParam("startingBid") LocalDateTime startingBid,
                                                               @RequestParam("staffId") int staffId,
                                                               @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
    AuctionSessionDTO auction = auctionSessionService.createSession(name, description, startDate, endDate, startingBid, staffId, image);


        return ResponseEntity.ok(auction);
    }

    @GetMapping("/all-session")
    public ResponseEntity<List<AuctionSessionDTO>> getAllAuctionSession() {
        return ResponseEntity.ok(auctionSessionService.getAllAuctionSession());
    }

    @GetMapping("/session/{id}")
    public ResponseEntity<AuctionSessionDTO> getAuctionSessionById(@PathVariable int id) {
        return ResponseEntity.ok(auctionSessionService.getAuctionSessionById(id));
    }

    @GetMapping("/all-created-session")
    public ResponseEntity<List<AuctionSessionDTO>> getAllAuctionSessionByCreatedStatus() {
        return ResponseEntity.ok(auctionSessionService.getAllAuctionSessionByCreatedStatus());
    }

    @PostMapping("/add-lot-to-session")
    public ResponseEntity<AuctionSession> addLotToSession(@RequestParam("lotId") int lotId,
                                                          @RequestParam("sessionId") int sessionId) {
        return ResponseEntity.ok(auctionSessionService.addLotToSession(lotId, sessionId));
    }

    @GetMapping("/session/upcoming")
    public ResponseEntity<List<AuctionSessionDTO>> getUpcomingAuctionSession() {
        return ResponseEntity.ok(auctionSessionService.getAuctionSession(AuctionSessionStatus.UPCOMING));
    }

    @PostMapping("/session/view-live-auction-session-detail")
    public ResponseEntity<?> viewLiveAuctionSessionDetail(@RequestParam("sessionId") Integer sessionId,
                                                          @RequestParam("memberId") Integer memberId) {
        ResponseEntity<?> response = auctionSessionService.viewLiveAuctionSessionDetail(sessionId, memberId);
        return response;
    }

    @PostMapping("/session/upcoming/details")
    public ResponseEntity<Map<String,Object>> getUpcomingAuctionSessionDetails(@RequestParam("sessionId") Integer sessionId,
                                                                               @RequestParam("memberId") Integer memberId) {
        return ResponseEntity.ok(auctionSessionService.getAuctionSessionDetails(sessionId,memberId));
    }

    @GetMapping("/session/live")
    public ResponseEntity<List<AuctionSessionDTO>> getLiveAuctionSession() {
        return ResponseEntity.ok(auctionSessionService.getAuctionSession(AuctionSessionStatus.LIVE));
    }

    //Change status of auction session from CREATED to UPCOMING
    @PostMapping("/public-session/{sessionId}")
    public ResponseEntity<?> publicAuctionSession(@PathVariable Integer sessionId) {
        return ResponseEntity.ok(auctionSessionService.publicAuctionSession(sessionId));
    }
}
