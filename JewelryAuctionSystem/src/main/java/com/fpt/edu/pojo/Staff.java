package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "staff")
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staff_Id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @OneToMany(mappedBy = "staff")
    private Set<FinancialProofRequest> financialProofRequests = new LinkedHashSet<>();

    @OneToMany(mappedBy = "staff")
    private Set<ValuationRequest> valuationRequests = new LinkedHashSet<>();

}