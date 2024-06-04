package com.fpt.edu.mapper;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.entity.Account;

public class AccountMapper {

    public static AccountDTO toAccountDTO(Account account) {
        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setId(account.getId());
        accountDTO.setUsername(account.getUsername());
        accountDTO.setRole(account.getRole().getId());
        accountDTO.setStaffId(account.getStaff().getId());
        accountDTO.setCreateDate(account.getCreateDate());
        return accountDTO;
    }
}
