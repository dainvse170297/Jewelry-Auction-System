package com.fpt.edu.service;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.entity.Account;
import com.fpt.edu.response.AuthenticationResponse;
import com.nimbusds.jose.JOSEException;

public interface IAccountService {

    public AuthenticationResponse login(String username, String password) throws JOSEException;

    Account createAccount(String username, String password, String fullName, String email, String phone, String address);
}
