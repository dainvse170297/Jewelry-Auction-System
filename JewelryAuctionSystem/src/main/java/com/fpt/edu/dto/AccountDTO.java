package com.fpt.edu.dto;

import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.Role;
import com.fpt.edu.entity.Staff;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDTO {
    private Integer id;
    private RoleDTO roleDTO;
    private String username;
    private String password;
    private LocalDate createDate;
}
