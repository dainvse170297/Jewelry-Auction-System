package com.fpt.edu.dto;

import com.fpt.edu.entity.ProductImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailDTO
{
    private Integer productId;
    private Integer valuationRequestId;
    private String categoryName;
    private String nameProduct;
    private String description;
    private BigDecimal estimatePriceMin;
    private BigDecimal estimatePriceMax;
    private List<ProductImage> productImages;
}