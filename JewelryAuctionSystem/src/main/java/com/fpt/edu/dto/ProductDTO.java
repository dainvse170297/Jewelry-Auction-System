package com.fpt.edu.dto;

import com.fpt.edu.entity.Category;
import com.fpt.edu.entity.ValuationRequest;
import lombok.*;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@Builder(toBuilder = true)
public class ProductDTO {
    private int id;
    private ValuationRequestDTO valuationRequestDTO;
    private CategoryDTO categoryDTO;
    private String name;
    private String description;
    private BigDecimal estimatePriceMax;
    private BigDecimal estimatePriceMin;

    public ProductDTO() {
    }

    public ProductDTO(int id, ValuationRequestDTO valuationRequestDTO, String name, CategoryDTO categoryDTO, String description, BigDecimal estimatePriceMax, BigDecimal estimatePriceMin) {
        this.id = id;
        this.valuationRequestDTO = valuationRequestDTO;
        this.name = name;
        this.categoryDTO = categoryDTO;
        this.description = description;
        this.estimatePriceMax = estimatePriceMax;
        this.estimatePriceMin = estimatePriceMin;
    }
}
