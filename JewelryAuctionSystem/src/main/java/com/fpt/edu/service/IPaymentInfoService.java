package com.fpt.edu.service;

import com.fpt.edu.entity.PaymentInfo;

import java.util.List;

public interface IPaymentInfoService {

    List<PaymentInfo> getAllPaymentInfo();

    List<PaymentInfo> findByWinnerId(Integer winnerId);
}
