package com.fpt.edu.service;

import com.fpt.edu.dto.PaymentInfoDTO;
import com.fpt.edu.entity.PaymentInfo;
import com.fpt.edu.mapper.PaymentInfoMapper;
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
    public List<PaymentInfoDTO> findByWinnerId(Integer winnerId) {
        List<PaymentInfo> list = paymentInfoRepository.findByWinnerId(winnerId);
        return PaymentInfoMapper.mapPaymentInfoListToDTOList(list);
    }
}
