package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;
@Entity
@Data
@Table(name = "account")
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(name = "username", length = 50)
    private String username;

    @Column(name = "password", length = 50)
    private String password;

    @Column(name = "create_date")
    private LocalDate createDate;

    @OneToMany(mappedBy = "account")
    private Set<Member> members = new LinkedHashSet<>();

    @OneToMany(mappedBy = "account")
    private Set<Staff> staff = new LinkedHashSet<>();

}