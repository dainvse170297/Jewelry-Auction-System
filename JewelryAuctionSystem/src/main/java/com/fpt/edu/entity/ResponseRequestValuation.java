package com.fpt.edu.entity;

import com.fpt.edu.status.ResponseValuationRequestStatus;
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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "response_id", nullable = false)
    private Integer id;

//    @OneToOne(cascade = CascadeType.ALL, optional = false)
//    @JoinColumn(name = "valuation_request_id",referencedColumnName = "valuation_request_id", nullable = false)
//    private ValuationRequest valuationRequest;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ResponseValuationRequestStatus responseValuationRequestStatus;

    @Column(name = "valuation_price", precision = 19, scale = 2)
    private BigDecimal valuationPrice;

    @Column(name = "time_response")
    private LocalDate timeResponse;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "staff_id", nullable = true)
    private Staff staff;
}