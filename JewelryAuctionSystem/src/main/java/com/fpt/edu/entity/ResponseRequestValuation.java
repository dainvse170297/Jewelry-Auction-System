package com.fpt.edu.entity;

import com.fpt.edu.status.ResponseValuationRequestStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "response_valuation_request")
public class ResponseRequestValuation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "response_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "valuation_request_id",referencedColumnName = "valuation_request_id", nullable = false)
    private ValuationRequest valuationRequest;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ResponseValuationRequestStatus responseValuationRequestStatus;

//    @Column(name = "valuation_price", precision = 19, scale = 2)
//    private BigDecimal valuationPrice;
    @Column(name = "valuation_price_min", precision = 19, scale = 1)
    private BigDecimal valuationPriceMin;

    @Column(name = "valuation_price_max", precision = 19, scale = 1)
    private BigDecimal valuationPriceMax;
    
    @Column(name = "time_response")
    private LocalDateTime timeResponse;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "staff_id", nullable = true)
    private Staff staff;
}