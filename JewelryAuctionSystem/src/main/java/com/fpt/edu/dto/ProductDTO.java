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
public class ProductDTO
{
    private Integer productId;
    private int valuationRequestDTO;
    private String categoryName;
    private String nameProduct;
    private String description;
    private BigDecimal estimatePriceMin;
    private BigDecimal estimatePriceMax;
    private List<ProductImage> productImages;



}
