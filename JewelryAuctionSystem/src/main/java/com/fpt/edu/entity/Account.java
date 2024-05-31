package com.fpt.edu.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "account")
@AllArgsConstructor
@NoArgsConstructor
public class Account { //OK
    //ok
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id", nullable = false)
    private int id;
    //ok
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(name = "username", length = 50)
    private String username;

    @Column(name = "password", length = 50)
    private String password;

    @Column(name = "create_date")
    private LocalDate createDate;

    @OneToOne(mappedBy = "account",optional = true)
    private Member members;

    @OneToOne(mappedBy = "account",optional = true)
    private Staff staff;

}