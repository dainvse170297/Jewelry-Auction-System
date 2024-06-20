package com.fpt.edu.repository;

import com.fpt.edu.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface IAccountRepository extends JpaRepository<Account, Integer> {
    public Optional<Account> findByUsernameAndPassword(String username, String password);

    Optional<Account> findByUsername(String username);



}
