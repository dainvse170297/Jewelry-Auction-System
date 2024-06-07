package com.fpt.edu.dto;

import lombok.*;

import java.math.BigDecimal;
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO1 {
    private Integer id;
    private CreditCardDTO creditCardDTO;
     BigDecimal financialProofAmount;
    private String email;
    private String fullname;
    private String address;
    private String phone;



}
