package com.fpt.edu.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "credit_card")
public class CreditCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "credit_card_id", nullable = false)
    private Integer id;

    @Column(name = "account_holder", length = 50)
    private String accountHolder;

    @Column(name = "bank_number", length = 20)
    private String bankNumber;

    @Column(name = "bank_name", length = 50)
    private String bankName;

// ????
//    @OneToOne(fetch = FetchType.LAZY, mappedBy = "creditCard")
//    @OneToOne(mappedBy = "creditCard")
//    private Member member;

}