package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "response_request")
@AllArgsConstructor
@Data
@NoArgsConstructor
public class ResponseRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int responeRequestId;
    @Column(precision = 19,scale = 1)
    private BigDecimal valuationPrice;
    private Date time;

    // còn status
}
