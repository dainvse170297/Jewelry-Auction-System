package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "valuation_request")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValuationRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int valuationRequestId;

    private Date timeRequest;
    private String description;
    @Column(precision = 19,scale = 1)
    private BigDecimal estimatePriceMin;
    @Column(precision = 19,scale = 1)
    private BigDecimal estimatePriceMax;
    // còn status

}
