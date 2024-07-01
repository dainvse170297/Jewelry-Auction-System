package com.fpt.edu.dto;

import com.fpt.edu.status.PaymentInfoStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentInfoDTO {
    private Integer paymentId;
    private BigDecimal amount;
    private LocalDateTime creationTime;
    private String imageUrl;
    private PaymentInfoStatus status;

}
