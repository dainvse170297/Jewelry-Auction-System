package com.fpt.edu.repository;

import com.fpt.edu.entity.Lot;
import com.fpt.edu.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LotRepository extends JpaRepository<Lot, Integer> {
}
