package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "member")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int member_id;

    @OneToOne
    @JoinColumn(name = "account_id",unique = true)
    private Account account;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private List<Notify> notify;

    @OneToOne
    @JoinColumn(name = "credit_card_id")
    private CreditCard creditCard;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private List<FinancialProofRequest> financialProofRequestList;

    @Column(precision = 19, scale = 1)
    private BigDecimal price;
    @Column(length = 100)
    private String address;
    @Column(length = 10)
    private String phone;
    @Column(length = 50)
    private String fullname;
    @Column(length = 50)
    private String email;


}
