package com.fpt.edu.controller;

import com.fpt.edu.security.request.IntrospectRequest;
import com.fpt.edu.security.response.AuthenticationResponse;
import com.fpt.edu.security.response.IntrospectResponse;
import com.fpt.edu.service.AccountService;
import com.nimbusds.jose.JOSEException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

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

}
