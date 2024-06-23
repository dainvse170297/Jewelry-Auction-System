package com.fpt.edu.controller;

import com.fpt.edu.dto.AuctionRegisterDTO;
import com.fpt.edu.entity.AuctionRegister;
import com.fpt.edu.exception.OutOfFinancialProofAmountException;
import com.fpt.edu.service.AuctionRegisterService;
import com.fpt.edu.service.IAuctionRegisterService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin("*")
@RequestMapping("/auction-register")
@RequiredArgsConstructor
@RestController
public class AuctionRegisterController {
    @Autowired
    private IAuctionRegisterService auctionRegisterService;

    @PostMapping("/register")
    public AuctionRegisterDTO registerToBid(@RequestBody AuctionRegister register) {
        return auctionRegisterService.register(register);
    }

    @PostMapping("/place-to-bid")
    public ResponseEntity<AuctionRegister> placeBidBeforeAuctions(@RequestParam("lotId") Integer lotId,
                                                     @RequestParam("memberId") Integer memberId,
                                                     @RequestParam(value = "price", required = false) BigDecimal price) {
        return ResponseEntity.ok(auctionRegisterService.placeToBid(lotId, memberId, price));
    }

    @GetMapping("/check-member-register/{memberId}/{lotId}")
    public ResponseEntity<AuctionRegisterDTO> checkMemberRegister(@PathVariable("memberId") int memberId,
                                                       @PathVariable("lotId") int lotId) {
        return ResponseEntity.ok(auctionRegisterService.checkMemberRegister(memberId, lotId));
    }

    @GetMapping("/view-win-auction-list/{memberId}")
    public ResponseEntity<List<AuctionRegister>> checkMemberRegister(@PathVariable("memberId") int memberId) {
        return ResponseEntity.ok(auctionRegisterService.getListWinAuctionOfMember(memberId));
    }

    @PostMapping("/confirm-product-delivery/{auctionRegisterId}")
    public ResponseEntity<AuctionRegisterDTO> confirmProductDelivery(@PathVariable("auctionRegisterId") Integer auctionRegisterId) {
        return ResponseEntity.ok(auctionRegisterService.confirmProductDelivery(auctionRegisterId));
    }

    @GetMapping("/get-auction-register-by-memberId/{memberId}")
    public ResponseEntity<List<AuctionRegister>> getAuctionRegisterByMemberId(@PathVariable("memberId") Integer memberId) {
        return ResponseEntity.ok(auctionRegisterService.getAuctionRegisterByMemberId(memberId));
    }

}
