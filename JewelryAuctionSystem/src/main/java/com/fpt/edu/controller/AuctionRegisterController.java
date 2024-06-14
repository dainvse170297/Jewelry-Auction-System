package com.fpt.edu.controller;

import com.fpt.edu.dto.AuctionRegisterDTO;
import com.fpt.edu.entity.AuctionRegister;
import com.fpt.edu.service.AuctionRegisterService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequestMapping("/auction-register")
@RequiredArgsConstructor
@RestController
public class AuctionRegisterController {
    @Autowired
    private AuctionRegisterService auctionRegisterService;

    @PostMapping("/register")
    public AuctionRegisterDTO RegisterToBid(@RequestBody AuctionRegister register) {
        return auctionRegisterService.registration(register);
    }

    @PostMapping("/place-to-bid/{id}")
    public AuctionRegisterDTO PlaceBidBeforeAuctions(@RequestBody AuctionRegister register, @PathVariable("id") Integer id) {
        return auctionRegisterService.placetobid(register, id);
    }
}
