package com.fpt.edu.mapper;

import com.fpt.edu.dto.CreditCardDTO;
import com.fpt.edu.entity.CreditCard;

public class CreaditcardM {
    public static   CreditCardDTO mapToDTO(CreditCard c) {
        return new CreditCardDTO(
                c.getId(),
                c.getAccountHolder(),
                c.getBankNumber(),
                c.getBankName()

        );
    }
    public static CreditCard mapToEntity(CreditCardDTO c) {
        return new CreditCard(
                c.getId(),
                c.getAccountHolder(),
                c.getBankNumber(),
                c.getBankName()

        );
    }
}
