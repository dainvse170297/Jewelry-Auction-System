package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "auction_register")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuctionRegister {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int registerId;

    @Column(precision = 19,scale = 1)
    private BigDecimal previousPrice;

    @Column(precision = 19,scale = 1)
    private BigDecimal currentPrice;

    @Column(precision = 19,scale = 1)
    private BigDecimal finalPrice;

    // còn status,is_win



}
