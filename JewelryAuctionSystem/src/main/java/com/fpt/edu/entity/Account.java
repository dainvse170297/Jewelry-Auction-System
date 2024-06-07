package com.fpt.edu.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "account")
@AllArgsConstructor

public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id", nullable = false)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(name = "username", length = 50)
    private String username;

    @Column(name = "password", length = 50)
    private String password;

    @Column(name = "create_date")
    private LocalDate createDate;

//    @OneToOne(fetch = FetchType.EAGER, mappedBy = "account",optional = true)
//    @JoinColumn(name = "member_id", nullable = true)
    @OneToOne(cascade = CascadeType.ALL, optional = true)
    private Member members;

    @OneToOne(cascade = CascadeType.ALL, optional = true)
    private Staff staff;


    public Account() {
    }



    public Account(Integer id, Role role, String username, String password, LocalDate createDate) {
        this.id = id;
        this.role = role;
        this.username = username;
        this.password = password;
        this.createDate = createDate;
    }
}