package com.fpt.edu.dto;

import com.fpt.edu.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffDTO {
    private Integer id;
    private AccountDTO accountDTO;


}
