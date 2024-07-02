package com.fpt.edu.controller;

import com.fpt.edu.service.ISellerPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

@CrossOrigin("*")
@RestController
@RequestMapping("/seller-payment")
@RequiredArgsConstructor
public class SellerPaymentController {

    private final ISellerPaymentService sellerPaymentService;

    @PostMapping("/save")
    public ResponseEntity<?> saveSellerPayment(@RequestParam("memberId") int memberId,
                                               @RequestParam("auctionRegisterID") int auctionRegisterID,
                                                  @RequestParam("transferAmount") BigDecimal transferAmount,
                                               @RequestParam("image") MultipartFile[] image) throws IOException {
        return ResponseEntity.ok(sellerPaymentService.save(memberId, auctionRegisterID, transferAmount, image));
    }
}
