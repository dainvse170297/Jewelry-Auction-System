package com.fpt.edu.controller;

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


}
