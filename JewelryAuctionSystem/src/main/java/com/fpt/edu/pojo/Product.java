package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "valuation_request_id", nullable = false)
    private ValuationRequest valuationRequest;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "name", length = 50)
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

}