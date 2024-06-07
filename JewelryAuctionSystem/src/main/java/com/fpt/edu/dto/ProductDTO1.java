package com.fpt.edu.dto;

import com.fpt.edu.entity.Category;
import com.fpt.edu.entity.ValuationRequest;
import lombok.*;

import java.math.BigDecimal;
@Data
@Getter
@Setter
@Builder(toBuilder = true)
public class ProductDTO1 {
    private int id;
    private CategoryDTO categoryDTO;
    private String name;
    private String description;
    private BigDecimal estimatePriceMax;
    private BigDecimal estimatePriceMin;

    public ProductDTO1() {
    }

    public ProductDTO1(int id, CategoryDTO categoryDTO, String name, String description, BigDecimal estimatePriceMax, BigDecimal estimatePriceMin) {
        this.id = id;
        this.categoryDTO = categoryDTO;
        this.name = name;
        this.description = description;
        this.estimatePriceMax = estimatePriceMax;
        this.estimatePriceMin = estimatePriceMin;
    }



}
