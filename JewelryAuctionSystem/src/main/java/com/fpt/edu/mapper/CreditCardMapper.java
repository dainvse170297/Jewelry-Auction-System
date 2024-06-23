package com.fpt.edu.mapper;

import com.fpt.edu.dto.CreditCardDTO;
import com.fpt.edu.entity.CreditCard;
import com.fpt.edu.repository.ICreditCardRepository;
import com.fpt.edu.repository.IMemberRepository;

public class CreditCardMapper {
    private ICreditCardRepository creditCardRepository;
    private IMemberRepository memberRepository;

    public CreditCardDTO mapToCreditCardDTO(CreditCard creditCard) {
        return new CreditCardDTO(creditCard.getId(),
                creditCard.getAccountHolder(),
                creditCard.getBankNumber(),
                creditCard.getBankName()
//                creditCard.getMember().getId()
        );
    }

    public CreditCard mapToCreditCard(CreditCardDTO creditCardDTO) {
        CreditCard creditCard = new CreditCard();
        creditCard.setId(creditCardDTO.getId());
        creditCard.setAccountHolder(creditCardDTO.getAccountHolder());
        creditCard.setBankNumber(creditCardDTO.getBankNumber());
        creditCard.setBankName(creditCardDTO.getBankName());
//        creditCard.setMember(memberRepository.getReferenceById(creditCardDTO.getMemberId()));
        return creditCard;
    }

}
