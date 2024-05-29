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
@Table(name = "response_request_valuation")
public class ResponseRequestValuation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "response_id", nullable = false)
    private Integer id;

    @Column(name = "status")
    private Byte status;

    @Column(name = "valuation_price", precision = 19, scale = 2)
    private BigDecimal valuationPrice;

    @Column(name = "time")
    private LocalDate time;

    @OneToMany(mappedBy = "response")
    private Set<ValuationRequest> valuationRequests = new LinkedHashSet<>();

}