package com.fpt.edu.controller;

import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.service.IAuctionSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

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


}
