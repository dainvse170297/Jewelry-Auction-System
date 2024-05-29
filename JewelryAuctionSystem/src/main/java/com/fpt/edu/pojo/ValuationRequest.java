package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "valuation_request")
public class ValuationRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "valuation_request_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "response_id", nullable = false)
    private ResponseRequestValuation response;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "staff_Id", nullable = false)
    private Staff staff;

    @Column(name = "time_request")
    private LocalDate timeRequest;

    @Column(name = "description")
    private String description;

    @Column(name = "valuation_status")
    private Integer valuationStatus;

    @Column(name = "delivery_status")
    private Integer deliveryStatus;

    @Column(name = "estimate_price_min", precision = 19, scale = 1)
    private BigDecimal estimatePriceMin;

    @Column(name = "estimate_price_max", precision = 19, scale = 1)
    private BigDecimal estimatePriceMax;

    @OneToMany(mappedBy = "valuationRequest")
    private Set<Product> products = new LinkedHashSet<>();

    @OneToMany(mappedBy = "request")
    private Set<ValuationImage> valuationImages = new LinkedHashSet<>();

}