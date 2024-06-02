package com.fpt.edu.dto;

import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.Product;
import com.fpt.edu.entity.ResponseRequestValuation;
import com.fpt.edu.entity.ValuationImage;
import com.fpt.edu.enums.ValuationRequestStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class ValuationRequestDTO {
    private Integer id;
    private MemberDTO memberDTO;
    private LocalDate timeRequest;
    private ValuationRequestStatus valuationStatus;
    private BigDecimal estimatePriceMax;
    private BigDecimal estimatePriceMin;
    private String description;
    private ResponseRequestValuationDTO responseRequestValuations;
}
