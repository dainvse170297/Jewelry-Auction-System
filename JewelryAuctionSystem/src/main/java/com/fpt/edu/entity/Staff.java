package com.fpt.edu.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "staff")
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staff_id", nullable = false)
    private Integer id;

    @Column(name = "fullname", nullable = false)
    private String fullname;

//    @OneToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "account_id", nullable = false)
//    private Account account;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "staff")
    private Set<AuctionSession> auctionSessions = new LinkedHashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "staff")
    private Set<FinancialProofRequest> financialProofRequests = new LinkedHashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "staff")
    private Set<ResponseRequestValuation> responseRequestValuations= new LinkedHashSet<>();

}