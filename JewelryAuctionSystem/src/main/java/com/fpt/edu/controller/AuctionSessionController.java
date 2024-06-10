package com.fpt.edu.controller;

import com.fpt.edu.dto.AuctionSessionDTO;
import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.service.IAuctionSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/auction")
@RequiredArgsConstructor
public class AuctionSessionController {

    private final IAuctionSessionService auctionSessionService;

    @PostMapping("/create-session")
    public ResponseEntity<AuctionSession> createAuctionSession(@RequestParam("name") String name,
                                                               @RequestParam("description") String description,
                                                               @RequestParam("startTime") LocalDate startDate,
                                                               @RequestParam("startingBid") LocalDate startingBid,
                                                               @RequestParam("staffId") int staffId) {
    AuctionSession auction = auctionSessionService.createSession(name, description, startDate, startingBid, staffId);

        return ResponseEntity.ok(auction);
    }

    @GetMapping("/all-session")
    public ResponseEntity<List<AuctionSession>> getAllAuctionSession() {
        return ResponseEntity.ok(auctionSessionService.getAllAuctionSession());
    }

    @GetMapping("/session/{id}")
    public ResponseEntity<AuctionSession> getAuctionSessionById(@PathVariable int id) {
        return ResponseEntity.ok(auctionSessionService.getAuctionSessionById(id));
    }

    @GetMapping("/all-created-session")
    public ResponseEntity<List<AuctionSession>> getAllAuctionSessionByCreatedStatus() {
        return ResponseEntity.ok(auctionSessionService.getAllAuctionSessionByCreatedStatus());
    }

    @PostMapping("/add-lot-to-session")
    public ResponseEntity<AuctionSession> addLotToSession(@RequestParam("lotId") int lotId,
                                                          @RequestParam("sessionId") int sessionId) {
        return ResponseEntity.ok(auctionSessionService.addLotToSession(lotId, sessionId));
    }

    @GetMapping("/session/upcoming")
    public ResponseEntity<List<AuctionSessionDTO>> getUpcomingAuctionSession() {
        return ResponseEntity.ok(auctionSessionService.getUpcomingAuctionSession());
    }
}
