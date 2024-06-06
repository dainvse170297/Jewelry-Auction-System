package com.fpt.edu.dto;

import com.fpt.edu.entity.ProductImage;
import com.fpt.edu.status.ValuationRequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ViewDetailValuationRequestFinalApprovedDTO {
    private Integer id;
    private Integer memberId;
    private LocalDate timeRequest;
    private ValuationRequestStatus valuationStatus;
    private BigDecimal estimatePriceMax;
    private BigDecimal estimatePriceMin;
    private String description;
    private Integer productId;
    private List<ProductImage> productImages;
}
