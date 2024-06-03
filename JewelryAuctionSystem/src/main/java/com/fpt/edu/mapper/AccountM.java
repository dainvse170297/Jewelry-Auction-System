package com.fpt.edu.mapper;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.dto.RoleDTO;
import com.fpt.edu.entity.Account;

    public class AccountM {
        public static AccountDTO mapToDTO(Account account) {
            return new AccountDTO(
                    account.getId(),
                    RoleM.mapToDTO(account.getRole()),
                    account.getUsername(),
                    account.getPassword(),
                    account.getCreateDate()
            );
        }
        public static Account mapToEntity(AccountDTO accountDTO) {
            return new Account(
                    accountDTO.getId(),
                    RoleM.mapToEntity(accountDTO.getRoleDTO()   ),
                    accountDTO.getUsername(),
                    accountDTO.getPassword(),
                    accountDTO.getCreateDate()
            );
        }
    }
