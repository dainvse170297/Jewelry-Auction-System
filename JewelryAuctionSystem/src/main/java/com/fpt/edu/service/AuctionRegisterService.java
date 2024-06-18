package com.fpt.edu.service;

import com.fpt.edu.dto.AuctionRegisterDTO;
import com.fpt.edu.entity.AuctionRegister;
import com.fpt.edu.entity.FinancialProofRequest;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.entity.Member;
import com.fpt.edu.exception.OutOfFinancialProofAmountException;
import com.fpt.edu.mapper.AuctionRegisterMapper;
import com.fpt.edu.repository.IAuctionRegisterRepository;
import com.fpt.edu.repository.IFinancialProofRequestRepository;
import com.fpt.edu.repository.ILotRepository;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.status.AuctionRegisterStatus;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;



@Service
@RequiredArgsConstructor
public class AuctionRegisterService implements IAuctionRegisterService {

    private final IAuctionRegisterRepository auctionRegisterRepository;
    private final IFinancialProofRequestRepository financialProofRequestRepository;

    private final IMemberRepository memberRepository;
    private final ILotRepository lotRepository;

    @Override
    public AuctionRegisterDTO register(AuctionRegister register) {

        register.setStatus(AuctionRegisterStatus.REGISTERED);
        register = auctionRegisterRepository.save(register);
        return AuctionRegisterMapper.toAuctionRegisterDTO(register);
    }

    @Override
    public AuctionRegister placeToBid(Integer lotId,Integer memberId, BigDecimal price) {
//            FinancialProofRequest financialProofRequest=financialProofRequestRepository.getReferenceById(id);
//
//        if (financialProofRequest.getFinancialProofAmount().compareTo(register.getCurrentPrice())>0) {
//            if(register.getCurrentPrice().compareTo(register.getPreviousPrice())>0){
//                register.setFinalPrice(register.getCurrentPrice());
//                register.setPreviousPrice(register.getCurrentPrice());
//                register.setStatus(AuctionRegisterStatus.REGISTERED);
//                register = auctionRegisterRepository.save(register);
//                return AuctionRegisterMapper.toAuctionRegisterDTO(register);
//            }
//        } else {
//            System.out.println("not enough money");
//        }
        if(price == null){
            price = BigDecimal.ZERO;
        }
        AuctionRegister auctionRegister = new AuctionRegister();
        Member member = memberRepository.findById(memberId).get();
        Lot lot = lotRepository.findById(lotId).get();

        if(member.getFinancialProofAmount() == null || member.getFinancialProofAmount().compareTo(price) < 0){
            throw new OutOfFinancialProofAmountException("Not enough money. Please check your financial proof amount.");
        }
        auctionRegister.setMember(member);
        auctionRegister.setLot(lot);
        auctionRegister.setStatus(AuctionRegisterStatus.REGISTERED);
        auctionRegister.setCurrentPrice(price);

        auctionRegisterRepository.save(auctionRegister);

        return auctionRegister;
    }

    @Override
    public boolean checkMemberRegister(int id, int lotId) {
        AuctionRegister auctionRegister = auctionRegisterRepository.findByLotIdAndMemberId(lotId, id);
        return auctionRegister != null;
    }

    @Override
    public List<AuctionRegister> getListWinAuctionOfMember(Integer memberId){
            AuctionRegisterStatus auctionRegisterStatus = AuctionRegisterStatus.PENDING_PAYMENT;
        return auctionRegisterRepository.findAuctionRegisterByMemberIdAndStatus(memberId, auctionRegisterStatus);
    }



}