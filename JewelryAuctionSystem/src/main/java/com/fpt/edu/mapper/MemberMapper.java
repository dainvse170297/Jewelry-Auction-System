package com.fpt.edu.mapper;
import com.fpt.edu.dto.MemberDTO;
import com.fpt.edu.entity.Member;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MemberMapper {
    public static CreditCardMapper creditCardMapper = new CreditCardMapper();
    public static MemberDTO mapToMemberDTO(Member member, Integer id){
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId(id);
        if (member.getCreditCard() != null)
        memberDTO.setCreditCard(creditCardMapper.mapToCreditCardDTO(member.getCreditCard()));
        memberDTO.setFinancialProofAmount(member.getFinancialProofAmount());
        memberDTO.setEmail(member.getEmail());
        memberDTO.setFullname(member.getFullname());
        memberDTO.setAddress(member.getAddress());
        memberDTO.setPhone(member.getPhone());
        return memberDTO;
    }

    public static MemberDTO toMemberDTO(Member member){
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId(member.getId());
        if (member.getCreditCard() != null)
            memberDTO.setCreditCard(creditCardMapper.mapToCreditCardDTO(member.getCreditCard()));
        memberDTO.setFinancialProofAmount(member.getFinancialProofAmount());
        memberDTO.setEmail(member.getEmail());
        memberDTO.setFullname(member.getFullname());
        memberDTO.setAddress(member.getAddress());
        memberDTO.setPhone(member.getPhone());
        return memberDTO;
    }

    public static List<MemberDTO> toMemberDTOs(List<Member> members){
        return members.stream().map(MemberMapper::toMemberDTO).toList();
    }
}
