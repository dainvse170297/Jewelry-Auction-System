package com.fpt.edu.dto;

import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.Role;
import com.fpt.edu.entity.Staff;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountDTO {
    private int id;
    private Integer role;
    private String username;
    private LocalDate createDate;
    private Integer memberId;
    private Integer staffId;
}
