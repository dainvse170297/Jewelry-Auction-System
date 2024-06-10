package com.fpt.edu.dto;

import com.fpt.edu.status.ResponseValuationRequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseRequestValuationDTO {

    private Integer id;
    private ResponseValuationRequestStatus status;
//    private BigDecimal valuationPrice;
    private BigDecimal valuationPriceMin;
    private BigDecimal valuationPriceMax;
    private LocalDateTime timeResponse;
    private Integer staffId;
    private Integer valuationRequestId;
}
