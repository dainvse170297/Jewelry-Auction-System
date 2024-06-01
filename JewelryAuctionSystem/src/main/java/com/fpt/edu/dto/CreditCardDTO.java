package com.fpt.edu.dto;

import com.fpt.edu.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreditCardDTO {

    private Integer id;
    private String accountHolder;
    private String bankNumber;
    private String bankName;
//    private Integer memberId;
}
