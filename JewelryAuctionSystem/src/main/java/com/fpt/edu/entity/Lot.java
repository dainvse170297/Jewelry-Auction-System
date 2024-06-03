package com.fpt.edu.entity;

import com.fpt.edu.enums.LotStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "lot")
public class Lot {
//done
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lot_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "auction_session_id", nullable = false)
    private AuctionSession auctionSession;

    @Column(name = "current_price", precision = 19, scale = 1)
    private BigDecimal currentPrice;


    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private LotStatus status;

    @OneToMany(mappedBy = "lot")
    private Set<AuctionRegister> auctionRegisters = new LinkedHashSet<>();

    @OneToMany(mappedBy = "lot")
    private Set<Bid> bids = new LinkedHashSet<>();



    public Lot(Integer id, Product product, AuctionSession auctionSession, BigDecimal currentPrice, LotStatus status) {
        this.id = id;
        this.product = product;
        this.auctionSession = auctionSession;
        this.currentPrice = currentPrice;
        this.status = status;
    }
}