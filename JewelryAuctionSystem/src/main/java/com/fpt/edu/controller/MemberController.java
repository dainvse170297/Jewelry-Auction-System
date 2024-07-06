package com.fpt.edu.controller;

import com.fpt.edu.dto.CreditCardRequestDTO;
import com.fpt.edu.dto.MemberDTO;
import com.fpt.edu.entity.Member;
import com.fpt.edu.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/info")
    public ResponseEntity<MemberDTO> getInfo(){
      MemberDTO memberDTO =  memberService.getMyInfo();
        return ResponseEntity.ok().body(memberDTO);
    }

    @GetMapping("/profile/{memberId}")
    public ResponseEntity<Member> getMemberById(@PathVariable("memberId") Integer memberId){
        Member member = memberService.getMemberById(memberId);
        return ResponseEntity.ok().body(member);
    }
    @GetMapping("/product/{productId}")
    public ResponseEntity<MemberDTO> getMemberByProductId(@PathVariable("productId") Integer productId){
        MemberDTO memberDTO = memberService.getMemberByProductId(productId);
        return ResponseEntity.ok().body(memberDTO);
    }

    @GetMapping("/financial-proof/{memberId}")
    public ResponseEntity<MemberDTO> getMyInfoFinancialProof(@PathVariable("memberId") Integer memberId){
        MemberDTO memberDTO = memberService.getMyInfoFinancialProof(memberId);
        return ResponseEntity.ok().body(memberDTO);
    }

    @PostMapping("/profile/{memberId}/add-credit-card")
    public ResponseEntity<Member> addCreditCard(@PathVariable("memberId") Integer memberId,
                                              @RequestBody CreditCardRequestDTO creditCardDto){
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
}
