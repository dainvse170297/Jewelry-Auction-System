package com.fpt.edu.repository;

import com.fpt.edu.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface IAccountRepository extends JpaRepository<Account, Integer> {
    public Optional<Account> findByUsernameAndPassword(String username, String password);

    Optional<Account> findByUsername(String username);

    @Query("SELECT a FROM Account a WHERE a.createDate BETWEEN :startDate AND :endDate")
    List<Account> findByCreationDateBetween(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);

}
