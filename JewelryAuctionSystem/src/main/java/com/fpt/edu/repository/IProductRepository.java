package com.fpt.edu.repository;

import com.fpt.edu.entity.Product;
import com.fpt.edu.entity.ValuationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductRepository extends JpaRepository<Product, Integer> {

}
