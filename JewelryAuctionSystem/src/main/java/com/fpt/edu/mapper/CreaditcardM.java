package com.fpt.edu.mapper;

import com.fpt.edu.dto.CreditCardDTO;
import com.fpt.edu.entity.CreditCard;

public class CreaditcardM {
    public static CreditCardDTO mapToDTO(CreditCard creditCard) {
        return new CreditCardDTO(
                creditCard.getId(),
                creditCard.getAccountHolder(),
                creditCard.getBankNumber(),
                creditCard.getBankName()

        );
    }
    public static CreditCard mapToEntity(CreditCardDTO creditCardDTO) {
        return new CreditCard(
                creditCardDTO.getId(),
                creditCardDTO.getAccountHolder(),
                creditCardDTO.getBankNumber(),
                creditCardDTO.getBankName()

        );
    }
}
