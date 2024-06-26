package com.fpt.edu.controller;


import com.fpt.edu.dto.BidDTO;
import com.fpt.edu.entity.Bid;
import com.fpt.edu.service.IBidService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/bid")
@RequiredArgsConstructor
public class BidController {
    private final IBidService iBidService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/place-bid")
    public ResponseEntity<BidDTO> placeBid(@RequestParam("memberId") Integer memberId,
                                           @RequestParam("lotId") Integer lotId,
                                           @RequestParam("price") BigDecimal price) {
        ResponseEntity<BidDTO> response = iBidService.placeForBid(memberId, lotId, price);

        // If the bid was placed successfully, send a message to the WebSocket broker
        if (response.getStatusCode().is2xxSuccessful()) {
            messagingTemplate.convertAndSend("/topic/bids/" + lotId, response.getBody());
        }
        return response;
    }

    @GetMapping("/list-bid")
    public ResponseEntity<List<BidDTO>> listBid(@RequestParam("lotId") Integer lotId) {
        return ResponseEntity.ok(iBidService.getListBidByLotIdWithTimeDesc(lotId));
    }


}

