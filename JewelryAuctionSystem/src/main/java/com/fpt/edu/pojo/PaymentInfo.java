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
@Table(name = "payment_info")
public class PaymentInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id", nullable = false)
    private Integer id;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "status")
    private Integer status;

    @Column(name = "creation_time")
    private LocalDate creationTime;

    @Column(name = "amount", precision = 19, scale = 1)
    private BigDecimal amount;

    @OneToMany(mappedBy = "payment")
    private Set<AuctionRegister> auctionRegisters = new LinkedHashSet<>();

}