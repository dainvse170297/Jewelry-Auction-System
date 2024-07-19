package com.fpt.edu.controller;

import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.SellerPayment;
import com.fpt.edu.service.ISellerPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

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

    @GetMapping("/all")
    public ResponseEntity<List<SellerPayment>> getAllSellerPayment() {
        return ResponseEntity.ok(sellerPaymentService.getAllSellerPayment());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SellerPayment> getSellerPaymentById(@PathVariable Integer id) {
        return ResponseEntity.ok(sellerPaymentService.getSellerPaymentById(id));
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<SellerPayment>> getSellerPaymentByMemberId(@PathVariable Integer memberId) {
        return ResponseEntity.ok(sellerPaymentService.getByMemberId(memberId));
    }


    @GetMapping("/get-member/{sellerPaymentId}")
    public ResponseEntity<Member> getMemberBySellerPaymentId(@PathVariable int sellerPaymentId) {
        return ResponseEntity.ok(sellerPaymentService.getMemberBySellerPaymentId(sellerPaymentId));
    }   
}