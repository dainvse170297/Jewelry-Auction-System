package com.fpt.edu.mapper;


import com.fpt.edu.dto.AccountDTO1;
import com.fpt.edu.entity.Account;

public class AccountM {
    public static AccountDTO1 mapToDTO(Account account) {
        return new AccountDTO1(
                account.getId(),
                RoleM.mapToDTO(account.getRole()),
                account.getUsername(),
                account.getPassword(),
                account.getCreateDate()
        );
    }
    public static Account mapToEntity(AccountDTO1 accountDTO) {
        return new Account(
                accountDTO.getId(),
                RoleM.mapToEntity(accountDTO.getRoleDTO()),
                accountDTO.getUsername(),
                accountDTO.getPassword(),
                accountDTO.getCreateDate()
        );
    }
}
