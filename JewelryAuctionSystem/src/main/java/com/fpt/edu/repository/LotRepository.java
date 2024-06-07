package com.fpt.edu.repository;

import com.fpt.edu.entity.Lot;
import com.fpt.edu.status.LotStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LotRepository extends JpaRepository<Lot, Integer> {
    public List<Lot> findByStatus(LotStatus status);

}