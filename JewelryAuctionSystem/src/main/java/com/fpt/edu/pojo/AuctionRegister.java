package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "auction_register")
public class AuctionRegister {
    @EmbeddedId
    private AuctionRegisterId id;

    @MapsId("memberId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @MapsId("lotId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lot_id", nullable = false)
    private Lot lot;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "payment_id", nullable = false)
    private PaymentInfo payment;

    @Column(name = "pre_price", precision = 19, scale = 1)
    private BigDecimal prePrice;

    @Column(name = "is_win")
    private Boolean isWin;

    @Column(name = "current_price", precision = 19, scale = 1)
    private BigDecimal currentPrice;

    @Column(name = "final_price", precision = 19, scale = 1)
    private BigDecimal finalPrice;

    @Column(name = "status")
    private Integer status;

}