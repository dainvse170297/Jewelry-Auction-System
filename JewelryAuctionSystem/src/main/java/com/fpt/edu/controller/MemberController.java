package com.fpt.edu.controller;

import com.fpt.edu.dto.CreditCardRequestDTO;
import com.fpt.edu.dto.MemberDTO;
import com.fpt.edu.entity.Member;
import com.fpt.edu.service.AccountService;
import com.fpt.edu.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final AccountService accountService;

    @GetMapping("/info")
    public ResponseEntity<MemberDTO> getInfo() {
        MemberDTO memberDTO = memberService.getMyInfo();
        return ResponseEntity.ok().body(memberDTO);
    }

    @GetMapping("/profile/{memberId}")
    public ResponseEntity<Member> getMemberById(@PathVariable("memberId") Integer memberId) {
        Member member = memberService.getMemberById(memberId);
        return ResponseEntity.ok().body(member);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<MemberDTO> getMemberByProductId(@PathVariable("productId") Integer productId) {
        MemberDTO memberDTO = memberService.getMemberByProductId(productId);
        return ResponseEntity.ok().body(memberDTO);
    }

    @GetMapping("/financial-proof/{memberId}")
    public ResponseEntity<MemberDTO> getMyInfoFinancialProof(@PathVariable("memberId") Integer memberId) {
        MemberDTO memberDTO = memberService.getMyInfoFinancialProof(memberId);
        return ResponseEntity.ok().body(memberDTO);
    }

    @PostMapping("/profile/{memberId}/add-credit-card")
    public ResponseEntity<Member> addCreditCard(@PathVariable("memberId") Integer memberId,
                                                @RequestBody CreditCardRequestDTO creditCardDto) {
        return ResponseEntity.ok().body(memberService.addCreditCard(memberId, creditCardDto));
    }

    @PutMapping("/profile/{memberId}/edit-credit-card")
    public ResponseEntity<Member> editCreditCard(@PathVariable("memberId") Integer memberId,
                                                 @RequestBody CreditCardRequestDTO creditCardDto) {
        return ResponseEntity.ok().body(memberService.editCreditCard(memberId, creditCardDto));
    }

    @DeleteMapping("/profile/{memberId}/delete-credit-card")
    public ResponseEntity<String> deleteCreditCard(@PathVariable Integer memberId) {
        boolean isDeleted = memberService.deleteCreditCard(memberId);
        if (isDeleted) {
            return ResponseEntity.ok("Credit Card Deleted Successfully");
        } else {
            return ResponseEntity.badRequest().body("Credit Card Not Found");
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<MemberDTO>> getAllMembers() {
        List<MemberDTO> memberDTO = memberService.getAllMembers();
        return ResponseEntity.ok().body(memberDTO);
    }

    @PostMapping("/account/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteAccount(@PathVariable("id") Integer id) { //acccount id chu ko phai staff id
        return ResponseEntity.ok().body(accountService.deleteAccount(id));
    }

    @PostMapping("/account/update/{id}")
    public ResponseEntity<Member> updateMemberAccount(@PathVariable("id") Integer id, //member id
                                                      @RequestParam("fullname") String fullName,
                                                      @RequestParam("email") String email,
                                                      @RequestParam("phone") String phone,
                                                      @RequestParam("address") String address) {
        return ResponseEntity.ok().body(memberService.updateMemberAccount(id, fullName, email, phone, address));
    }

    @PostMapping("/account/update/{id}/credit-card")
    public ResponseEntity<Member> updateMemberCreditCard(@PathVariable("id") Integer id, //member id
                                                      @RequestParam("accountHolder") String accountHolder,
                                                      @RequestParam("bankName") String bankName,
                                                      @RequestParam("bankNumber") String bankNumber) {
        return ResponseEntity.ok().body(memberService.updateMemberCreditCard(id, accountHolder, bankName, bankNumber));
    }
}
