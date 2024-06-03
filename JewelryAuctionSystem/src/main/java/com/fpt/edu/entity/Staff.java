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

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @OneToMany(mappedBy = "staff")
    private Set<AuctionSession> auctionSessions = new LinkedHashSet<>();

    @OneToMany(mappedBy = "staff")
    private Set<FinancialProofRequest> financialProofRequests = new LinkedHashSet<>();

    @OneToMany(mappedBy = "staff")
    private Set<ResponseRequestValuation> responseRequestValuations= new LinkedHashSet<>();

    public Staff(Integer id, Account account) {
        this.id = id;
        this.account = account;
    }
}