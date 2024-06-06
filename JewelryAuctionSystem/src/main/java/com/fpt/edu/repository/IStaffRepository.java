package com.fpt.edu.repository;

import com.fpt.edu.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IStaffRepository extends JpaRepository<Staff, Integer> {
}
