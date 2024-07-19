package com.fpt.edu.mapper;

import com.fpt.edu.dto.PaymentInfoDTO;
import com.fpt.edu.entity.PaymentInfo;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

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

    public static List<PaymentInfoDTO> mapPaymentInfoListToDTOList(List<PaymentInfo> paymentInfoList) {
        return paymentInfoList.stream()
                .map(PaymentInfoMapper::toPaymentInfoDTO)
                .collect(Collectors.toList());
    }
}
