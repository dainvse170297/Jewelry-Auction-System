package com.fpt.edu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false)
    private Integer id;

//    @OneToOne(cascade = CascadeType.ALL, optional = false)
//    @JoinColumn(name = "valuation_request_id", referencedColumnName = "valuation_request_id", nullable = false)
//    private ValuationRequest valuationRequest;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "category_id", nullable = true)
    private Category category;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "description", length=1000)
    private String description;

    @Column(name = "estimate_price_max", precision = 19, scale = 1)
    private BigDecimal estimatePriceMax;

    @Column(name = "estimate_price_min", precision = 19, scale = 1)
    private BigDecimal estimatePriceMin;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    private Set<Lot> lots = new LinkedHashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    private List<ProductImage> productImages = new ArrayList<>();

}