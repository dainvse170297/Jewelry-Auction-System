package com.fpt.edu.repository;

import com.fpt.edu.entity.PaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPaymentInfoRepository extends JpaRepository<PaymentInfo, Integer> {
}
