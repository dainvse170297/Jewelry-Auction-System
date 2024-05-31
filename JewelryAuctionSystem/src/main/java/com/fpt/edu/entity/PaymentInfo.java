package com.fpt.edu.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "payment_info")
public class PaymentInfo {
    //done
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private AuctionRegister auctionRegister;

    @Column(name = "status")
    private Integer status;

    @Column(name = "amount", precision = 19, scale = 1)
    private BigDecimal amount;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "creation_time")
    private LocalDate creationTime;

}