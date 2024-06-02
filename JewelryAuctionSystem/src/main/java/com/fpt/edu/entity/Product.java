package com.fpt.edu.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "product")
public class Product {
    //  done
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "valuation_request_id", nullable = false)
    private ValuationRequest valuationRequest;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "estimate_price_max", precision = 19, scale = 1)
    private BigDecimal estimatePriceMax;

    @Column(name = "estimate_price_min", precision = 19, scale = 1)
    private BigDecimal estimatePriceMin;

    @OneToMany(mappedBy = "product")
    private Set<Lot> lots = new LinkedHashSet<>();

    @OneToMany(mappedBy = "product")
    private Set<ProductImage> productImages = new LinkedHashSet<>();

    public Product() {
    }

    public Product(Integer id, ValuationRequest valuationRequest, Category category, String name, String description, BigDecimal estimatePriceMax, BigDecimal estimatePriceMin) {
        this.id = id;
        this.valuationRequest = valuationRequest;
        this.category = category;
        this.name = name;
        this.description = description;
        this.estimatePriceMax = estimatePriceMax;
        this.estimatePriceMin = estimatePriceMin;

    }
}