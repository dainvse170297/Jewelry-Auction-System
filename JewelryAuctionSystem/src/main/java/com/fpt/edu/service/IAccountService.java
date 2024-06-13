package com.fpt.edu.service;

import com.fpt.edu.security.request.IntrospectRequest;
import com.fpt.edu.security.response.AuthenticationResponse;
import com.fpt.edu.security.response.IntrospectResponse;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface IAccountService {

    public AuthenticationResponse login(String username, String password) throws JOSEException;
    public IntrospectResponse introspect(IntrospectRequest introspectRequest) throws JOSEException, ParseException;
}
