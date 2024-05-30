package com.fpt.edu.dto;

import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.Product;
import com.fpt.edu.entity.ResponseRequestValuation;
import com.fpt.edu.entity.ValuationImage;
import com.fpt.edu.enums.ValuationRequestStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ValuationRequestDTO {
    private int id;
    private Integer memberId;
    private LocalDate timeRequest;
    private ValuationRequestStatus valuationStatus;
    private BigDecimal estimatePriceMax;
    private BigDecimal estimatePriceMin;
    private String description;
    private Product products;
    private ResponseRequestValuation responseRequestValuations;
    private Set<ValuationImage> valuationImages = new LinkedHashSet<>();
}
