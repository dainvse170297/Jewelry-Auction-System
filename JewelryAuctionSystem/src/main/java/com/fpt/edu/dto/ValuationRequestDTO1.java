package com.fpt.edu.dto;

import com.fpt.edu.status.ValuationRequestStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ValuationRequestDTO1 {

    private int id;
    private MemberDTO1 memberDTO1;
    private LocalDate timeRequest;
    private ValuationRequestStatus valuationStatus;
    private BigDecimal estimatePriceMax;
    private BigDecimal estimatePriceMin;
    private String description;
    private Integer productId;
    private Integer responseRequestValuationsId;
    private Set<Integer> valuationImages = new LinkedHashSet<>();



    public ValuationRequestDTO1(Integer id, MemberDTO1 memberDTO1, LocalDate timeRequest, ValuationRequestStatus valuationStatus, BigDecimal estimatePriceMax, BigDecimal estimatePriceMin, String description) {
        this.id = id;
        this. memberDTO1 = memberDTO1;
        this.timeRequest = timeRequest;
        this.valuationStatus = valuationStatus;
        this.estimatePriceMax = estimatePriceMax;
        this.estimatePriceMin = estimatePriceMin;
        this.description = description;


    }
}
