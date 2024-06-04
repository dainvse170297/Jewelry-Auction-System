package com.fpt.edu.controller;

import com.fpt.edu.dto.AuctionSessionDTO;
import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.service.CreateAuctionSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auctionsession")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RestController
public class CreateAutionSession {
    @Autowired
    private CreateAuctionSessionService createAuctionSessionService;
    @PostMapping("/createAuctionSession")
    public AuctionSessionDTO createAuctionSession( @RequestBody AuctionSessionDTO auctionSessionDTO) {
        return createAuctionSessionService.createAuctionSession(auctionSessionDTO);
    }
}
