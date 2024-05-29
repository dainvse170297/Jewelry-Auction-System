package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
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

    @OneToMany(mappedBy = "creditCard")
    private Set<Member> members = new LinkedHashSet<>();

}