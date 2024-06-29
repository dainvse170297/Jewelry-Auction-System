package com.fpt.edu.service;

import com.fpt.edu.dto.MemberDTO;
import com.fpt.edu.entity.Member;

public interface IMemberService {

    Member getMemberById(Integer id);

    MemberDTO getMemberByProductId(Integer productId);

    MemberDTO getMyInfoFinancialProof(Integer memberId);
}
