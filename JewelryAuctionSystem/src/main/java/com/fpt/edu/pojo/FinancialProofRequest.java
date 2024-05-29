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
@Table(name = "financial_proof_request")
public class FinancialProofRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "financial_proof_request_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "staff_Id", nullable = false)
    private Staff staff;

    @Column(name = "image")
    private String image;

    @Column(name = "status")
    private Integer status;

    @Column(name = "financial_proof_amount", precision = 19, scale = 1)
    private BigDecimal financialProofAmount;

    @OneToMany(mappedBy = "financialProofRequest")
    private Set<FinancialProofImage> financialProofImages = new LinkedHashSet<>();

}