package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "credit_card")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int credit_card_id;
    @Column(length = 50)
    private String account_holder;
    @Column(length = 20)
    private String bank_number;
    @Column(length = 50)
    private String bank_name;
}
