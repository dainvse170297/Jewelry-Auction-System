package com.fpt.edu.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AccountDTO {
    private int id;
    private Integer role;
    private String roleName;
    private String fullname;
    private LocalDateTime createDate;
    private Integer memberId;
    private Integer staffId;
    private Integer managerId;

}
