package com.fpt.edu.service;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.entity.Account;
import com.fpt.edu.mapper.AccountMapper;
import com.fpt.edu.repository.IStaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StaffService implements IStaffService {

    private final IStaffRepository staffRepository;


    @Override
    public List<AccountDTO> getAllStaffAccounts() {
        List<Account> staffAccounts = staffRepository.findAccountByStaff();
        return staffAccounts.stream().map(account -> AccountMapper.toAccountDTO(account)).toList();
    }
}
