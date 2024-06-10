package com.fpt.edu.dto;

import com.fpt.edu.status.ValuationRequestStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ValuationRequestDTO {

    private int id;
    private Integer memberId;
    private LocalDateTime timeRequest;
    private ValuationRequestStatus valuationStatus;
    private BigDecimal estimatePriceMax;
    private BigDecimal estimatePriceMin;
    private String description;
    private Integer productId;
//    private Integer responseRequestValuationsId;
    private Set<Integer> valuationImages;
}
