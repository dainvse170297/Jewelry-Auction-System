package com.fpt.edu.pojo;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "account")
@AllArgsConstructor
@NoArgsConstructor
@Data //Ok
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accountId;
    @Column(length = 50)
    private String username;
    @Column(length = 50)
    private String password;
    private Date createdDate;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY
            , optional = true,mappedBy = "account")
    private Staff staff;

    @OneToOne(mappedBy = "account",cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,optional = true)
    private Member member;


}
