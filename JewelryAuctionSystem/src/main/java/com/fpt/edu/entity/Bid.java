package com.fpt.edu.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "bid")
public class Bid {
    //done
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bid_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lot_id", nullable = false)
    private Lot lot;

    @Column(name = "price", precision = 19, scale = 1)
    private BigDecimal price;

    @Column(name = "time")
    private LocalDate time;

    public Bid(Integer id, Member member, Lot lot, BigDecimal price, LocalDate time) {
        this.id = id;
        this.member = member;
        this.lot = lot;
        this.price = price;
        this.time = time;
    }
}