package com.fpt.edu.repository;

import com.fpt.edu.entity.SellerPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISellerPaymentRepository extends JpaRepository<SellerPayment, Integer> {
}
