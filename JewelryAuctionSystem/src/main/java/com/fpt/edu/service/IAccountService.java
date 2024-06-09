package com.fpt.edu.service;

import com.fpt.edu.dto.AccountDTO;

public interface IAccountService {

    public AccountDTO login(String username, String password);

}
