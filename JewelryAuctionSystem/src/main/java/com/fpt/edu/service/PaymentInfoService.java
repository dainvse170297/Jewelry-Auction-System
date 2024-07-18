package com.fpt.edu.service;

import com.fpt.edu.entity.PaymentInfo;
import com.fpt.edu.repository.IPaymentInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentInfoService implements IPaymentInfoService{

    private final IPaymentInfoRepository paymentInfoRepository;
    @Override
    public List<PaymentInfo> getAllPaymentInfo() {
        return paymentInfoRepository.findAll();
    }

    @Override
    public List<PaymentInfo> findByWinnerId(Integer winnerId) {
        return paymentInfoRepository.findByWinnerId(winnerId);
    }
}
