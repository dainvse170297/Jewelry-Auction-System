package com.fpt.edu.dto;

import com.fpt.edu.entity.Account;
import com.fpt.edu.entity.CreditCard;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberDTO {
    private Integer id;
    private CreditCardDTO creditCardDTO;
    private AccountDTO accountDTO;
    private BigDecimal financialProofAmount;
    private String email;
    private String fullname;
    private String address;
    private String phone;


}
