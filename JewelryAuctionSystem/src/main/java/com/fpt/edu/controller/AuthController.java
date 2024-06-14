package com.fpt.edu.controller;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.security.request.IntrospectRequest;
import com.fpt.edu.security.request.LogoutRequest;
import com.fpt.edu.security.request.RefreshRequest;
import com.fpt.edu.security.response.AuthenticationResponse;
import com.fpt.edu.security.response.IntrospectResponse;
import com.fpt.edu.service.AccountService;
import com.nimbusds.jose.JOSEException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AccountService accountService;


    @PostMapping("/token")
    public ResponseEntity<AuthenticationResponse> login(@RequestParam("username") String username,
                                                        @RequestParam("password") String password) throws JOSEException {

        return ResponseEntity.ok(accountService.login(username, password));

    }

    @PostMapping("/introspect")
    public ResponseEntity<IntrospectResponse> verifyToken(@RequestBody IntrospectRequest request) throws JOSEException, ParseException {

        return ResponseEntity.ok(accountService.introspect(request));

    }

    @PostMapping("/get-account-from-token")
    public ResponseEntity<AccountDTO> getAccount(@RequestBody IntrospectRequest request) throws JOSEException, ParseException {

        return ResponseEntity.ok(accountService.getAccountFromToken(request));

    }


    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody LogoutRequest request) throws JOSEException, ParseException {
        accountService.logout(request);
        return ResponseEntity.ok().build();

    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody RefreshRequest request) throws JOSEException, ParseException {

        return ResponseEntity.ok(accountService.refreshToken(request));

    }


}
