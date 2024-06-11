package com.fpt.edu.controller;


import com.fpt.edu.dto.BidDTO;
import com.fpt.edu.entity.Bid;
import com.fpt.edu.service.IBidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/bid")
@RequiredArgsConstructor
public class BidController {
        private final IBidService iBidService;

        @PostMapping("/place-bid")
        public ResponseEntity<Bid> placeBid(@RequestParam("price") BigDecimal price,
                                            @RequestParam("memberId") Integer memberId,
                                            @RequestParam("lotId") Integer lotId) {
                return ResponseEntity.ok(iBidService.placeforBid(price, memberId, lotId));
        }
}

