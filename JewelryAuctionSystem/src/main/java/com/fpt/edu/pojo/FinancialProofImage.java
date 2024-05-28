package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FinancialProofImage {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int image_id;

        @ManyToOne(cascade = CascadeType.ALL)
        @JoinColumn(name = "financial_proof_request_id")
        private FinancialProofRequest financialProofRequest;
        private String imageUrl;
        private String defaulImage;
}
