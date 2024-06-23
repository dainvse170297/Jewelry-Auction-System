package com.fpt.edu.mapper;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.entity.Account;
import org.springframework.stereotype.Component;

@Component
public class AccountMapper {

    public static AccountDTO toAccountDTO(Account account) {
        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setId(account.getId());
        accountDTO.setFullname(account.getStaff().getFullname());
        accountDTO.setRole(account.getRole().getId());
        accountDTO.setStaffId(account.getStaff().getId());
        accountDTO.setRoleName(account.getRole().getName());
     //   accountDTO.setMemberId(account.getMembers().getId());
        accountDTO.setCreateDate(account.getCreateDate());
        return accountDTO;
    }
    public static AccountDTO toAccountMemberDTO(Account account) {
        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setId(account.getId());
        accountDTO.setFullname(account.getMembers().getFullname());
        accountDTO.setRole(account.getRole().getId());
        accountDTO.setRoleName(account.getRole().getName());
       // accountDTO.setStaffId(account.getStaff().getId());
        accountDTO.setMemberId(account.getMembers().getId());
        accountDTO.setCreateDate(account.getCreateDate());
        return accountDTO;
    }
}
