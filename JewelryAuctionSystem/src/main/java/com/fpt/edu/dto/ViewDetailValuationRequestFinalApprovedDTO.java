package com.fpt.edu.dto;

import com.fpt.edu.entity.ProductImage;
import com.fpt.edu.status.ValuationRequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ViewDetailValuationRequestFinalApprovedDTO {
    private Integer id;
    private Integer memberId;
    private LocalDateTime timeRequest;
    private ValuationRequestStatus valuationStatus;
    private BigDecimal estimatePriceMaxProduct;
    private BigDecimal estimatePriceMinProduct;
    private String productDescription;
    private Integer productId;
    private String productName;
    private String category;
    private List<ProductImage> productImages;
}
