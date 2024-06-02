package com.fpt.edu.repository;

import com.fpt.edu.entity.Product;
import com.fpt.edu.entity.ValuationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
