package com.fpt.edu.entity;

import com.fpt.edu.status.ValuationRequestStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "valuation_request")
public class ValuationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "valuation_request_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "member_id", nullable = true)
    private Member member;

    @Column(name = "time_request")
    private LocalDateTime timeRequest;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ValuationRequestStatus valuationStatus;

    @Column(name = "estimate_price_max", precision = 19, scale = 1, nullable = true)
    private BigDecimal estimatePriceMax;

    @Column(name = "estimate_price_min", precision = 19, scale = 1, nullable = true)
    private BigDecimal estimatePriceMin;

    @Column(name = "member_estimate_price", precision = 19, scale = 1, nullable = true)
    private BigDecimal memberEstimatePrice;

    @Column(name = "description")
    private String description;

    @Column(name = "cancel_reason", nullable = true)
    private String cancelReason;

    @OneToOne(cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "product_id", nullable = true)
    private Product product;
//
//    @OneToOne(cascade = CascadeType.ALL, optional = true)
//    @JoinColumn(name = "response_id", nullable = true)
//    private ResponseRequestValuation responseRequestValuations;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "request")
    private Set<ValuationImage> valuationImages = new LinkedHashSet<>();

}