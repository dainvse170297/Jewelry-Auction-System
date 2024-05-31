package com.fpt.edu.dto;

import com.fpt.edu.entity.Product;
import com.fpt.edu.entity.ResponseRequestValuation;
import com.fpt.edu.entity.ValuationImage;
import com.fpt.edu.enums.ValuationRequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinalValuationRequestDTO {


    private Integer memberId;
    private LocalDate timeRequest;
    private ValuationRequestStatus valuationStatus;
    private BigDecimal estimatePriceMax;
    private BigDecimal estimatePriceMin;
    private String description;


}
