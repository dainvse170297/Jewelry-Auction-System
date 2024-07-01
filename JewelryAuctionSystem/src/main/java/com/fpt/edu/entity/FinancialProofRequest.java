    package com.fpt.edu.entity;

    import com.fpt.edu.status.FinancialProofRequestStatus;
    import jakarta.persistence.*;
    import lombok.*;

    import java.math.BigDecimal;
    import java.time.LocalDateTime;
    import java.util.LinkedHashSet;
    import java.util.Set;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Entity
    @Table(name = "financial_proof_request")
    public class FinancialProofRequest {
        //done
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "financial_proof_request_id", nullable = false)
        private Integer id;

        @Column(name = "time_request")
        private LocalDateTime timeRequest;

        @ManyToOne(fetch = FetchType.LAZY, optional = true)
        @JoinColumn(name = "member_id", nullable = true)
        private Member member;

        @ManyToOne(fetch = FetchType.LAZY, optional = true)
        @JoinColumn(name = "staff_id", nullable = true)
        private Staff staff;

        @ManyToOne(fetch = FetchType.EAGER, optional = true)
        @JoinColumn(name = "manager_id", nullable = true)
        private Manager manager;

        @Column(name = "status")
        @Enumerated(EnumType.STRING)
        private FinancialProofRequestStatus status;

        @Column(name = "financial_proof_amount", precision = 19, scale = 1)
        private BigDecimal financialProofAmount;

        @OneToMany(fetch = FetchType.LAZY, mappedBy = "financialProofRequest")
        private Set<FinancialProofImage> financialProofImages = new LinkedHashSet<>();


    }