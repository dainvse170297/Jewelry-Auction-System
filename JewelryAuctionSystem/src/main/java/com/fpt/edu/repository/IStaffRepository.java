package com.fpt.edu.repository;

import com.fpt.edu.entity.Account;
import com.fpt.edu.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IStaffRepository extends JpaRepository<Staff, Integer> {
    @Query(value = "SELECT acc FROM Account acc JOIN Staff st ON acc.staff.id = st.id")
    List<Account> findAccountByStaff();
}
