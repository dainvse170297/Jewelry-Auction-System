package com.fpt.edu.mapper;
import com.fpt.edu.dto.MemberDTO;
import com.fpt.edu.entity.Member;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {
    public  static MemberDTO mapToMemberDTO(Member member, Integer id){
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId(id);
        memberDTO.setCreditCardId(member.getCreditCard().getId());
        memberDTO.setAccountId(id);
        memberDTO.setFinancialProofAmount(member.getFinancialProofAmount());
        memberDTO.setEmail(member.getEmail());
        memberDTO.setFullname(member.getFullname());
        memberDTO.setAddress(member.getAddress());
        memberDTO.setPhone(member.getPhone());
        return memberDTO;
    }
}
