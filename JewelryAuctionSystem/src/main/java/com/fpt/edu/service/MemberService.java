package com.fpt.edu.service;

import com.fpt.edu.dto.CreditCardDTO;
import com.fpt.edu.dto.FinancialProofRequestDTO;
import com.fpt.edu.dto.MemberDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.repository.IAccountRepository;
import com.fpt.edu.repository.IFinancialProofRequestRepository;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.repository.IValuationRequestRepository;
import com.fpt.edu.status.FinancialProofRequestStatus;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import static com.fpt.edu.mapper.MemberMapper.mapToMemberDTO;

@Service
@RequiredArgsConstructor
public class MemberService implements IMemberService{
    private static final Logger log = LoggerFactory.getLogger(MemberService.class);
    private final IMemberRepository iMemberRepository;
    private final IAccountRepository iAccountRepository;
    private final IValuationRequestRepository iValuationRequestRepository;
    private final IFinancialProofRequestRepository iFinancialProofRequestRepository;
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
    @Override
    public MemberDTO getMyInfoFinancialProof(Integer memberId){
        Optional<Member> member = iMemberRepository.findById(memberId);
        CreditCard creditCard = member.get().getCreditCard();
        CreditCardDTO creditCardDTO = new CreditCardDTO();
        if(creditCard != null){
            creditCardDTO.setId(creditCard.getId());
            creditCardDTO.setAccountHolder(creditCard.getAccountHolder());
            creditCardDTO.setBankName(creditCard.getBankName());
            creditCardDTO.setBankNumber(creditCard.getBankNumber());
        }
        MemberDTO memberDTO = mapToMemberDTO(member.get(), memberId);
        memberDTO.setCreditCard(creditCardDTO);


//        List<FinancialProofRequest> financialProofRequest = iFinancialProofRequestRepository
//                .findLatestByMember(member.get(), PageRequest.of(0, 1));

        FinancialProofRequest financialProofRequest = iFinancialProofRequestRepository.
                findByMemberAndStatus(member.get(), FinancialProofRequestStatus.AVAILABLE);


        FinancialProofRequestDTO financialProofRequestDTO = new FinancialProofRequestDTO();
      //  FinancialProofRequest  financialProofRequest1 = financialProofRequest.get(0);
        if(financialProofRequest != null){
            financialProofRequestDTO.setFinancialProofAmount(financialProofRequest.getFinancialProofAmount());
            financialProofRequestDTO.setStatus(financialProofRequest.getStatus());
            financialProofRequestDTO.setTimeRequest(financialProofRequest.getTimeRequest());

        }
        memberDTO.setFinancialProofRequest(financialProofRequestDTO);

        return memberDTO;
    }
}
