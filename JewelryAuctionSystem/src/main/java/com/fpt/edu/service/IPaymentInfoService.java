package com.fpt.edu.service;

import com.fpt.edu.dto.PaymentInfoDTO;
import com.fpt.edu.entity.PaymentInfo;

import java.util.List;

public interface IPaymentInfoService {

    List<PaymentInfo> getAllPaymentInfo();

    List<PaymentInfoDTO> findByWinnerId(Integer winnerId);
}
