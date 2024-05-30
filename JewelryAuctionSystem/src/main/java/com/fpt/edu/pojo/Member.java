package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "member")
public class Member {
    //done
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "credit_card_id", nullable = false)
    private CreditCard creditCard;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

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

    @OneToMany(mappedBy = "member")
    private Set<AuctionRegister> auctionRegisters = new LinkedHashSet<>();

    @OneToMany(mappedBy = "member")
    private Set<Bid> bids = new LinkedHashSet<>();

    @OneToMany(mappedBy = "member")
    private Set<FinancialProofRequest> financialProofRequests = new LinkedHashSet<>();

    @OneToMany(mappedBy = "member")
    private Set<Notify> notifies = new LinkedHashSet<>();

    @OneToMany(mappedBy = "member")
    private Set<ValuationRequest> valuationRequests = new LinkedHashSet<>();

}