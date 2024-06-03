package com.fpt.edu.mapper;

import com.fpt.edu.dto.MemberDTO;
import com.fpt.edu.entity.Member;

public class MemberM {
    public static MemberDTO mapToDTO(Member member) {
        return new MemberDTO(
                member.getId(),
                CreaditcardM.mapToDTO(member.getCreditCard()),
                AccountM.mapToDTO(member.getAccount()),
                member.getFinancialProofAmount(),
                member.getEmail(),
                member.getFullname(),
                member.getAddress(),
                member.getPhone()
        );
    }
    public static Member mapToEntity(MemberDTO memberDTO) {
        return new Member(
                memberDTO.getId(),
                CreaditcardM.mapToEntity(memberDTO.getCreditCardDTO()),
                AccountM.mapToEntity(memberDTO.getAccountDTO()),
                memberDTO.getFinancialProofAmount(),
                memberDTO.getEmail(),
                memberDTO.getFullname(),
                memberDTO.getAddress(),
                memberDTO.getPhone()
        );
    }
}
