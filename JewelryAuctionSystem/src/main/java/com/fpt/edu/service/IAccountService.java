package com.fpt.edu.service;


import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.security.request.IntrospectRequest;
import com.fpt.edu.security.response.AuthenticationResponse;
import com.fpt.edu.security.response.IntrospectResponse;
import com.fpt.edu.entity.Account;


import com.nimbusds.jose.JOSEException;

import java.text.ParseException;
import java.util.Map;

public interface IAccountService {

    public AuthenticationResponse login(String username, String password) throws JOSEException;

    public IntrospectResponse introspect(IntrospectRequest introspectRequest) throws JOSEException, ParseException;

    public Account createAccount(String username, String password, String fullName, String email, String phone, String address);

    public AccountDTO getAccountFromToken(IntrospectRequest introspectRequest) throws ParseException, JOSEException;

    public Map<String,Object> getInformationById(Integer id);

    public Map<String,Object> changePassword(Integer id, String oldPassword, String newPassword);

    public Map<String,Object> changeInformation(Integer id, String fullname, String phone, String address);
}
