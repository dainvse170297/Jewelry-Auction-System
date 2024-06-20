package com.fpt.edu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "financial_proof_image")
public class FinancialProofImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id", nullable = false)
    private Integer id;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "financial_proof_request_id", nullable = true)
    private FinancialProofRequest financialProofRequest;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "default_image")
    private String defaultImage;

}