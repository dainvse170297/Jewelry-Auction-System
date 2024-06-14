package com.fpt.edu.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Integer id;
    private Integer categoryId;
    private String name;
    private String description;
    private BigDecimal estimatePriceMin;
    private BigDecimal estimatePriceMax;
    private Set<Integer> lots = new LinkedHashSet<>();
    private List<Integer> productImages = new ArrayList<>();
}
