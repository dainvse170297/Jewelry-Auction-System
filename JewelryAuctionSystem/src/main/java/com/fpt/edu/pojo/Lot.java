package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "lot")
public class Lot {
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
    private Integer status;

    @OneToMany(mappedBy = "lot")
    private Set<AuctionRegister> auctionRegisters = new LinkedHashSet<>();

    @OneToMany(mappedBy = "lot")
    private Set<Bid> bids = new LinkedHashSet<>();

}