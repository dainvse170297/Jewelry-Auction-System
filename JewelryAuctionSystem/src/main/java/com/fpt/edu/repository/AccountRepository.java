package com.fpt.edu.repository;

import com.fpt.edu.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {


 Optional<Account>  findByUsernameAndPassword(String username, String password);

}
