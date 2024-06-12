package com.fpt.edu.service;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.entity.Account;

public interface IAccountService {

    public AccountDTO login(String username, String password);

    Account createAccount(String username, String password, String fullName, String email, String phone, String address);
}
