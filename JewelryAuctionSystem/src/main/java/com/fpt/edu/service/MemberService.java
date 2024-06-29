package com.fpt.edu.service;

import com.fpt.edu.dto.CreditCardDTO;
import com.fpt.edu.dto.MemberDTO;
import com.fpt.edu.entity.Account;
import com.fpt.edu.entity.CreditCard;
import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.repository.IAccountRepository;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.repository.IValuationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.fpt.edu.mapper.MemberMapper.mapToMemberDTO;

@Service
@RequiredArgsConstructor
public class MemberService implements IMemberService{
    private static final Logger log = LoggerFactory.getLogger(MemberService.class);
    private final IMemberRepository iMemberRepository;
    private final IAccountRepository iAccountRepository;
    private final IValuationRequestRepository iValuationRequestRepository;

    public MemberDTO getMyInfo(){
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("Username: {}", name);
        Optional<Account> account = iAccountRepository.findByUsername(name);

        if(account.isPresent()){
            Member member = account.get().getMembers();
            Integer id = member.getId();
            return mapToMemberDTO(member, id);
        }

        throw new RuntimeException("Account not found");
    }

    @Override
    public Member getMemberById(Integer id) {
        Optional<Member> member = iMemberRepository.findById(id);
        if(member.isPresent()){
            return member.get();
        }
        return null;
    }
    @Override
    public MemberDTO getMemberByProductId(Integer productId) {
        ValuationRequest valuationRequest =  iValuationRequestRepository.findByProductId(productId);
        log.info("ValuationRequest: {}", valuationRequest.getId());

        CreditCard creditCard = valuationRequest.getMember().getCreditCard();
        CreditCardDTO creditCardDTO = new CreditCardDTO();
        if(creditCard != null){
            creditCardDTO.setId(creditCard.getId());
            creditCardDTO.setAccountHolder(creditCard.getAccountHolder());
            creditCardDTO.setBankName(creditCard.getBankName());
            creditCardDTO.setBankNumber(creditCard.getBankNumber());
        }
        MemberDTO memberdto = mapToMemberDTO(valuationRequest.getMember(), valuationRequest.getMember().getId());
        memberdto.setCreditCard(creditCardDTO);
        return memberdto;

    }
}
