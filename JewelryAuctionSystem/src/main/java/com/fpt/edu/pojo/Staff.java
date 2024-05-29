package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "staff")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int staff_id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id",  unique = true)
    private Account account;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "staff")
    private List<FinancialProofRequest> financialProofRequestList;


}
