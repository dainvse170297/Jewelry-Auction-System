package com.fpt.edu.mapper;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.entity.Account;
import org.springframework.stereotype.Component;

@Component
public class AccountMapper {

    public static AccountDTO toAccountDTO(Account account) {
        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setId(account.getId());
        accountDTO.setRole(account.getRole().getId());
        accountDTO.setRoleName(account.getRole().getName());
        if(account.getMembers() != null){
            accountDTO.setMemberId(account.getMembers().getId());
            accountDTO.setFullname(account.getMembers().getFullname());
        }else if(account.getStaff() != null){
            accountDTO.setStaffId(account.getStaff().getId());
            accountDTO.setFullname(account.getStaff().getFullname());
        } else if (account.getManager() != null){
            accountDTO.setManagerId(account.getManager().getId());
            accountDTO.setFullname(account.getManager().getFullname());
        }
        accountDTO.setCreateDate(account.getCreateDate());
        return accountDTO;
    }
}
