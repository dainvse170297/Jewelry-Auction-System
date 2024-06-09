package com.fpt.edu.service;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.entity.Account;
import com.fpt.edu.mapper.AccountMapper;
import com.fpt.edu.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AccountService implements IAccountService{

    private final AccountRepository accountRepository;

    @Override
    public AccountDTO login(String username, String password) {

     Account account = accountRepository.findByUsernameAndPassword(username, password).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
            if(account.getMembers() == null)
                return AccountMapper.toAccountDTO(account);
     
          return AccountMapper.toAccountMemberDTO(account);

    }


}
