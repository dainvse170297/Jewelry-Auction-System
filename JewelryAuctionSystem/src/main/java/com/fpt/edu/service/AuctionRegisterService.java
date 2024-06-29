package com.fpt.edu.service;

import com.fpt.edu.dto.AuctionRegisterDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.exception.OutOfFinancialProofAmountException;
import com.fpt.edu.mapper.AuctionRegisterMapper;
import com.fpt.edu.repository.*;
import com.fpt.edu.status.AuctionRegisterStatus;
import com.fpt.edu.status.PaymentInfoStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;



@Service
@RequiredArgsConstructor
public class AuctionRegisterService implements IAuctionRegisterService {

    private final IAuctionRegisterRepository auctionRegisterRepository;

    private final IMemberRepository memberRepository;
    private final ILotRepository lotRepository;

    private final IPaymentInfoRepository paymentInfoRepository;


    @Override
    public AuctionRegisterDTO register(AuctionRegister register) {

        register.setStatus(AuctionRegisterStatus.REGISTERED);
        register = auctionRegisterRepository.save(register);
        return AuctionRegisterMapper.toAuctionRegisterDTO(register);
    }

    @Override
    public AuctionRegister placeToBid(Integer lotId,Integer memberId, BigDecimal price) {

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
        auctionRegister.setPreviousPrice(price);

        auctionRegisterRepository.save(auctionRegister);

        return auctionRegister;
    }

    @Override
    public AuctionRegisterDTO checkMemberRegister(int id, int lotId) {

        AuctionRegister auctionRegister = auctionRegisterRepository.findByLotIdAndMemberId(lotId, id);
        if (auctionRegister == null) {
            return null;
        }
        return AuctionRegisterMapper.toAuctionRegisterDTO(auctionRegister);
    }

    @Override
    public List<AuctionRegister> getListWinAuctionOfMember(Integer memberId){
            AuctionRegisterStatus auctionRegisterStatus = AuctionRegisterStatus.PENDING_PAYMENT;
        return auctionRegisterRepository.findAuctionRegisterByMemberIdAndStatus(memberId, auctionRegisterStatus);
    }

    @Override
    public void processAuctionRegisterAfterPayment(List<Integer> auctionRegisterIds) {
        PaymentInfo paymentInfo = new PaymentInfo();
        for(Integer auctionRegisterId : auctionRegisterIds){
            AuctionRegister auctionRegister = auctionRegisterRepository.findById(auctionRegisterId).get();
            auctionRegister.setStatus(AuctionRegisterStatus.WINNER_PURCHASED);
            auctionRegisterRepository.save(auctionRegister);


            paymentInfo.setAuctionRegister(auctionRegister);
            paymentInfo.setStatus(PaymentInfoStatus.SUCCESS);
            paymentInfo.setAmount(auctionRegister.getFinalPrice());
            paymentInfo.setCreationTime(LocalDateTime.now());
            paymentInfoRepository.save(paymentInfo);
        }
    }

    @Override
    public AuctionRegisterDTO confirmProductDelivery(Integer auctionRegisterId) {
        AuctionRegister auctionRegister = auctionRegisterRepository.findById(auctionRegisterId).get();
        if(auctionRegister.getStatus() == AuctionRegisterStatus.WINNER_PURCHASED){
            auctionRegister.setStatus(AuctionRegisterStatus.DELIVERED);
            auctionRegisterRepository.save(auctionRegister);
            return AuctionRegisterMapper.toAuctionRegisterDTO(auctionRegister);
        }else {
            throw new RuntimeException("Auction register is not in WINNER_PURCHASED status");
        }
    }

    @Override
    public List<AuctionRegister> getAuctionRegisterByMemberId(Integer memberId) {
        return auctionRegisterRepository.findAuctionRegisterByMemberId(memberId);
    }


}
