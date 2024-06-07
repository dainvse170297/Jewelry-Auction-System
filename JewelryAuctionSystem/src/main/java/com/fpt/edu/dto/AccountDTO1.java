package com.fpt.edu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDTO1 {
    private Integer id;
    private RoleDTO roleDTO;
    private String username;
    private String password;
    private LocalDate createDate;
}
