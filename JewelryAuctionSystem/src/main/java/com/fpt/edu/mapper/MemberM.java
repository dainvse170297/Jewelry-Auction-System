package com.fpt.edu.mapper;




import com.fpt.edu.dto.MemberDTO1;
import com.fpt.edu.entity.Member;

import java.security.cert.Extension;

public class MemberM {
    public static MemberDTO1 mapToDTO(Member member) {
        return new MemberDTO1(
                member.getId(),
                CreaditcardM.mapToDTO(member.getCreditCard()),

                member.getFinancialProofAmount(),
                member.getEmail(),
                member.getFullname(),
                member.getAddress(),
                member.getPhone()
        );
    }
    public static Member mapToEntity(MemberDTO1 memberDTO) {
        return new Member(
                memberDTO.getId(),
                CreaditcardM.mapToEntity(memberDTO.getCreditCardDTO()),

                memberDTO.getFinancialProofAmount(),
                memberDTO.getEmail(),
                memberDTO.getFullname(),
                memberDTO.getAddress(),
                memberDTO.getPhone()
        );
    }


}

