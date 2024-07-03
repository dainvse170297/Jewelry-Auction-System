package com.fpt.edu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreditCardRequestDTO {

    private String accountHolder;
    private String bankName;
    private String bankNumber;
}
