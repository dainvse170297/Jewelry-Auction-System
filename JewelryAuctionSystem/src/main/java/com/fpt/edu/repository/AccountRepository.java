package com.fpt.edu.repository;

import com.fpt.edu.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AccountRepository extends JpaRepository<Account, Integer> {

    @Query(value = "SELECT acc FROM Account acc JOIN Staff st ON acc.staff.id = st.id")
    Account findAccountByStaff();
}
