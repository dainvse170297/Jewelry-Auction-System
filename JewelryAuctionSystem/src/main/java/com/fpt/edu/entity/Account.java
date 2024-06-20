package com.fpt.edu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "account")
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
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

    @JsonIgnore
    @Column(name = "password", length = 50)
    private String password;
    @JsonIgnore
    @Column(name = "create_date")
    private LocalDateTime createDate;

//    @OneToOne(fetch = FetchType.EAGER, mappedBy = "account",optional = true)
//    @JoinColumn(name = "member_id", nullable = true)
    @OneToOne(cascade = CascadeType.ALL, optional = true)
    private Member members;


    @OneToOne(cascade = CascadeType.ALL, optional = true)
    private Staff staff;

    @OneToOne(cascade = CascadeType.ALL, optional = true)
    private Manager manager;

}