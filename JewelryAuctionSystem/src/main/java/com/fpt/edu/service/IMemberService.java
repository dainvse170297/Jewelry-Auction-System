package com.fpt.edu.service;

import com.fpt.edu.dto.CreditCardRequestDTO;
import com.fpt.edu.dto.MemberDTO;
import com.fpt.edu.entity.Member;

import java.util.List;

public interface IMemberService {

    Member getMemberById(Integer id);

    MemberDTO getMemberByProductId(Integer productId);

    MemberDTO getMyInfoFinancialProof(Integer memberId);

    public Member addCreditCard(Integer memberId, CreditCardRequestDTO creditCardDto);
    public Member editCreditCard(Integer memberId, CreditCardRequestDTO creditCardDto);
    public boolean deleteCreditCard(Integer memberId);
    List<MemberDTO> getAllMembers();
}
