package com.fpt.edu.service;

import com.fpt.edu.dto.CreditCardDTO;
import com.fpt.edu.dto.CreditCardRequestDTO;
import com.fpt.edu.dto.FinancialProofRequestDTO;
import com.fpt.edu.dto.MemberDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.MemberMapper;
import com.fpt.edu.repository.*;
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
import java.util.Objects;
import java.util.Optional;

import static com.fpt.edu.mapper.MemberMapper.mapToMemberDTO;

@Service
@RequiredArgsConstructor
public class MemberService implements IMemberService {
    private static final Logger log = LoggerFactory.getLogger(MemberService.class);
    private final IMemberRepository iMemberRepository;
    private final IAccountRepository iAccountRepository;
    private final IValuationRequestRepository iValuationRequestRepository;
    private final IFinancialProofRequestRepository iFinancialProofRequestRepository;
    private final ICreditCardRepository iCreditCardRepository;
    private final MemberMapper memberMapper;

    public MemberDTO getMyInfo() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("Username: {}", name);
        Optional<Account> account = iAccountRepository.findByUsername(name);

        if (account.isPresent()) {
            Member member = account.get().getMembers();
            Integer id = member.getId();
            return mapToMemberDTO(member, id);
        }

        throw new RuntimeException("Account not found");
    }

    @Override
    public Member getMemberById(Integer id) {
        Optional<Member> member = iMemberRepository.findById(id);
        if (member.isPresent()) {
            return member.get();
        }
        return null;
    }

    @Override
    public MemberDTO getMemberByProductId(Integer productId) {
        ValuationRequest valuationRequest = iValuationRequestRepository.findByProductId(productId);
        log.info("ValuationRequest: {}", valuationRequest.getId());

        CreditCard creditCard = valuationRequest.getMember().getCreditCard();
        CreditCardDTO creditCardDTO = new CreditCardDTO();
        if (creditCard != null) {
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
    public Member addCreditCard(Integer memberId, CreditCardRequestDTO creditCardDto) {
        log.info("MemberId: {}", memberId);
        Member member = iMemberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        if (member.getCreditCard() != null) {
            throw new RuntimeException("Credit card already  ADD");
        }

        CreditCard creditCard = new CreditCard();
        creditCard.setAccountHolder(creditCardDto.getAccountHolder());
        creditCard.setBankName(creditCardDto.getBankName());
        creditCard.setBankNumber(creditCardDto.getBankNumber());

        member.setCreditCard(creditCard);
        List<CreditCard> creditCardList = iCreditCardRepository.findAll();
        for (CreditCard creditCards : creditCardList) {
            if (creditCards.getBankNumber().equals(creditCardDto.getBankNumber())) {
                throw new RuntimeException("Bank number already exists");
            }
        }
        iMemberRepository.save(member);
        return member;
    }

    @Override
    public Member editCreditCard(Integer memberId, CreditCardRequestDTO creditCardDto) {
        log.info("MemberId: {}", memberId);
        Member member = iMemberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        CreditCard creditCard = member.getCreditCard();
        if (creditCard == null) {
            throw new RuntimeException("Credit card not found");
        }

        creditCard.setAccountHolder(creditCardDto.getAccountHolder());
        creditCard.setBankName(creditCardDto.getBankName());
        creditCard.setBankNumber(creditCardDto.getBankNumber());

        member.setCreditCard(creditCard);
        iMemberRepository.save(member);
        return member;
    }

    @Override
    public boolean deleteCreditCard(Integer memberId) {
        Optional<Member> member = iMemberRepository.findById(memberId);
        if (member.isPresent()) {
            Member memberProfile = member.get();
            CreditCard creditCard = memberProfile.getCreditCard();
            if (creditCard != null) {
                log.info("CreditCard: {}", creditCard.getId());
                memberProfile.setCreditCard(null);
                iMemberRepository.save(memberProfile);
                iCreditCardRepository.delete(creditCard);
                log.info("delete: {}", creditCard.getId());
                return true;
            }
        }
        return false;
    }

    @Override
    public List<MemberDTO> getAllMembers() {
        List<Member> members = iMemberRepository.findAll();
        return MemberMapper.toMemberDTOs(members);
    }


    @Override
    public MemberDTO getMyInfoFinancialProof(Integer memberId) {
        Optional<Member> member = iMemberRepository.findById(memberId);

        CreditCard creditCard = member.get().getCreditCard();

        CreditCardDTO creditCardDTO = new CreditCardDTO();
        log.info("MemberId: {}", memberId);
        log.info("MemberId: {}", creditCard);

        if (creditCard != null) {
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
        if (financialProofRequest != null) {
            financialProofRequestDTO.setFinancialProofAmount(financialProofRequest.getFinancialProofAmount());
            financialProofRequestDTO.setStatus(financialProofRequest.getStatus());
            financialProofRequestDTO.setTimeRequest(financialProofRequest.getTimeRequest());

        }
        memberDTO.setFinancialProofRequest(financialProofRequestDTO);

        return memberDTO;
    }

    @Override
    public Member updateMemberAccount(Integer id, String fullName, String email, String phone, String address) {
        Member member = iMemberRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Member not found")
        );
        member.setFullname(fullName);
        member.setEmail(email);
        member.setPhone(phone);
        member.setAddress(address);
        iMemberRepository.save(member);
        return member;
    }

    @Override
    public Member updateMemberCreditCard(Integer id, String accountHolder, String bankName, String bankNumber) {
        Member member = iMemberRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Member not found")
        );
        CreditCard creditCard = member.getCreditCard();
        if (creditCard == null) {
            creditCard = new CreditCard();
        }
        creditCard.setAccountHolder(accountHolder);
        creditCard.setBankName(bankName);
        creditCard.setBankNumber(bankNumber);
        iCreditCardRepository.save(creditCard);
        member.setCreditCard(creditCard);
        iMemberRepository.save(member);
        return member;
    }
}
