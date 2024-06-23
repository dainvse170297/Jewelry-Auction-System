package com.fpt.edu.entity;

import com.fpt.edu.status.AuctionRegisterStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;


@Entity
@Table(name = "auction_register")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuctionRegister {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auction_register_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "lot_id", nullable = false)
    private Lot lot;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private AuctionRegisterStatus status;

    @Column(name = "previous_price", precision = 19, scale = 1)
    private BigDecimal previousPrice;

    @Column(name = "current_price", precision = 19, scale = 1)
    private BigDecimal currentPrice;

    @Column(name = "final_price", precision = 19, scale = 1)
    private BigDecimal finalPrice;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "auctionRegister")
    private Set<PaymentInfo> paymentInfos = new LinkedHashSet<>();

}