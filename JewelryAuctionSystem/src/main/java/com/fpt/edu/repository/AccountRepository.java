package com.fpt.edu.repository;

import com.fpt.edu.entity.Account;
import com.fpt.edu.entity.AuctionRegister;
import com.fpt.edu.entity.AuctionSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository  extends JpaRepository<Account, Integer> {
}
