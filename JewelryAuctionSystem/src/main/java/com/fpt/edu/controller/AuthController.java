package com.fpt.edu.controller;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.entity.Account;
import com.fpt.edu.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

        private final AccountService accountService;
        @PostMapping("/login")
        public ResponseEntity<AccountDTO> login(@RequestParam("username") String username,
                                                @RequestParam("password") String password) {

            return ResponseEntity.ok(accountService.login(username, password));

        }

}
