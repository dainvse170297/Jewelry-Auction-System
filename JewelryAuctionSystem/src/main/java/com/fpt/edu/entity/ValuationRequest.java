package com.fpt.edu.entity;

import com.fpt.edu.status.ValuationRequestStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "time_request")
    private LocalDate timeRequest;

    @Column(name = "valuation_status")
    @Enumerated(EnumType.STRING)
    private ValuationRequestStatus valuationStatus;

    @Column(name = "estimate_price_max", precision = 19, scale = 1)
    private BigDecimal estimatePriceMax;

    @Column(name = "estimate_price_min", precision = 19, scale = 1)
    private BigDecimal estimatePriceMin;

    @Column(name = "description")
    private String description;

    @OneToOne(cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "product_id", nullable = true)
    private Product product;

    @OneToOne(cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "response_id", nullable = true)
    private ResponseRequestValuation responseRequestValuations;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "request")
    private Set<ValuationImage> valuationImages = new LinkedHashSet<>();

}