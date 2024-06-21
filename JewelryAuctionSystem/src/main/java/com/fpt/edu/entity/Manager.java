package com.fpt.edu.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "manager")
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "manager_id", nullable = false)
    private Integer id;

    @Column(name = "fullname", nullable = false)
    private String fullname;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "manager")
    private Set<FinancialProofRequest> financialProofRequests = new LinkedHashSet<>();
}
