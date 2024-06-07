package com.fpt.edu.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Data

@AllArgsConstructor
@Entity
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false)
    private Integer id;

    @OneToOne(cascade = CascadeType.ALL, optional = true)
//    @JoinColumn(name = "credit_card_id", nullable = true)
    private CreditCard creditCard;

//
//    @OneToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "account_id", nullable = false)
//    private Account account;

    @Column(name = "financial_proof_amount", precision = 19, scale = 1)
    private BigDecimal financialProofAmount;

    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @Column(name = "fullname", length = 50)
    private String fullname;

    @Column(name = "address", length = 100)
    private String address;

    @Column(name = "phone", length = 10)
    private String phone;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member")
    private Set<AuctionRegister> auctionRegisters = new LinkedHashSet<>();

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "member")
    private Set<Bid> bids = new LinkedHashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member")
    private Set<FinancialProofRequest> financialProofRequests = new LinkedHashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member")
    private Set<Notify> notifies = new LinkedHashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member")
    private Set<ValuationRequest> valuationRequests = new LinkedHashSet<>();

    public Member() {
    }

    public Member(Integer id, CreditCard creditCard, BigDecimal financialProofAmount, String email, String fullname, String address, String phone) {
        this.id = id;
        this.creditCard = creditCard;
        this.financialProofAmount = financialProofAmount;
        this.email = email;
        this.fullname = fullname;
        this.address = address;
        this.phone = phone;

    }



}