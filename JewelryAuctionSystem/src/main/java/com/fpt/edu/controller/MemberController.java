package com.fpt.edu.controller;

import com.fpt.edu.dto.MemberDTO;
import com.fpt.edu.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
