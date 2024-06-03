package com.fpt.edu.dto;

import com.fpt.edu.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditCardDTO {
    private Integer id;
    private String accountHolder;
    private String bankNumber;
    private String bankName;


}
