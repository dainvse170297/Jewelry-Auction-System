package com.fpt.edu.service;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.response.AuthenticationResponse;
import com.nimbusds.jose.JOSEException;

public interface IAccountService {

    public AuthenticationResponse login(String username, String password) throws JOSEException;

}
