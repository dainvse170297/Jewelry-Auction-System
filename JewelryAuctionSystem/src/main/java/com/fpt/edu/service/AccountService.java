package com.fpt.edu.service;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.entity.Account;
import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.Role;
import com.fpt.edu.exception.UsernameExistedException;
import com.fpt.edu.mapper.AccountMapper;
import com.fpt.edu.repository.IAccountRepository;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.repository.IRoleRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AccountService implements IAccountService{

    private final IAccountRepository accountRepository;
    private final IMemberRepository memberRepository;
    private final IRoleRepository roleRepository;

    @Override
    public AccountDTO login(String username, String password) {

     Account account = accountRepository.findByUsernameAndPassword(username, password).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
            if(account.getMembers() == null)
                return AccountMapper.toAccountDTO(account);
     
          return AccountMapper.toAccountMemberDTO(account);

    }

    @Override
    public Account createAccount(String username, String password, String fullName, String email, String phone, String address) {

        Account account = new Account();
        Member member = new Member();
        if(accountRepository.findByUsername(username).isPresent()){
            throw new UsernameExistedException("Username is existed");
        }else{
            account.setUsername(username);
            account.setPassword(password);
            account.setCreateDate(LocalDateTime.now());
            Role role = roleRepository.findByName("MEMBER");
            account.setRole(role);
            member.setFullname(fullName);
            member.setEmail(email);
            member.setPhone(phone);
            member.setAddress(address);
            account.setMembers(member);
            memberRepository.save(member);
            accountRepository.save(account);
        }
        return account;
    }
}
