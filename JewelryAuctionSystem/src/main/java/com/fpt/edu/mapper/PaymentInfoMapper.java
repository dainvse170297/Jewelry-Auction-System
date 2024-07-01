package com.fpt.edu.mapper;

import com.fpt.edu.dto.PaymentInfoDTO;
import com.fpt.edu.entity.PaymentInfo;
import org.springframework.stereotype.Component;

@Component
public class PaymentInfoMapper {

    public static PaymentInfoDTO toPaymentInfoDTO(PaymentInfo paymentInfo) {
        PaymentInfoDTO paymentInfoDTO = new PaymentInfoDTO();
        paymentInfoDTO.setPaymentId(paymentInfo.getId());
        paymentInfoDTO.setAmount(paymentInfo.getAmount());
        paymentInfoDTO.setCreationTime(paymentInfo.getCreationTime());
        paymentInfoDTO.setImageUrl(paymentInfo.getImageUrl());
        paymentInfoDTO.setStatus(paymentInfo.getStatus());
        return paymentInfoDTO;
    }
}
