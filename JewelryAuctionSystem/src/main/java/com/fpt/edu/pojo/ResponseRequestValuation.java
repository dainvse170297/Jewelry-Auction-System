package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "response_request_valuation")
public class ResponseRequestValuation {
   //done
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "response_id", nullable = false)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "valuation_request_id", nullable = false)
    private ValuationRequest valuationRequest;

    @Column(name = "status")
    private Byte status;

    @Column(name = "valuation_price", precision = 19, scale = 2)
    private BigDecimal valuationPrice;

    @Column(name = "time_response")
    private LocalDate timeResponse;

}