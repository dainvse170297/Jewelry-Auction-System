package com.fpt.edu.service;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.entity.Account;

import java.util.List;

public interface IStaffService {

    List<AccountDTO> getAllStaffAccounts();
}
