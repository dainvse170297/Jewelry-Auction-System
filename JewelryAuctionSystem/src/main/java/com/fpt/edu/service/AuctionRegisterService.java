package com.fpt.edu.service;

import com.fpt.edu.dto.AuctionRegisterDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.exception.OutOfFinancialProofAmountException;
import com.fpt.edu.mapper.AuctionRegisterMapper;
import com.fpt.edu.repository.*;
import com.fpt.edu.status.AuctionRegisterStatus;
import com.fpt.edu.status.NotifyType;
import com.fpt.edu.status.PaymentInfoStatus;
import com.fpt.edu.utils.MessageProvider;
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
    private final IValuationRequestRepository valuationRequestRepository;

    private final INotifyService iNotifyService;

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

        ValuationRequest valuationRequest = valuationRequestRepository.findByProductId(lot.getProduct().getId());

        Integer ownerId = valuationRequest.getMember().getId();
        if(ownerId.equals(memberId)){
            throw new RuntimeException("You can not register to bid your own jewelry");
        }else if(member.getFinancialProofAmount() == null || member.getFinancialProofAmount().compareTo(price) < 0){
            throw new OutOfFinancialProofAmountException("Not enough money. Please check your financial proof amount.");
        }else{
            auctionRegister.setMember(member);
            auctionRegister.setLot(lot);
            auctionRegister.setStatus(AuctionRegisterStatus.REGISTERED);
            auctionRegister.setPreviousPrice(price);

            auctionRegisterRepository.save(auctionRegister);
        }
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

        List<String> jewelryNames = new ArrayList<>();

        for(Integer auctionRegisterId : auctionRegisterIds){
            AuctionRegister auctionRegister = auctionRegisterRepository.findById(auctionRegisterId).get();
            PaymentInfo paymentInfo = new PaymentInfo();
            auctionRegister.setStatus(AuctionRegisterStatus.WINNER_PURCHASED);
            paymentInfo.setAuctionRegister(auctionRegister);
            paymentInfo.setStatus(PaymentInfoStatus.SUCCESS);
            paymentInfo.setAmount(auctionRegister.getFinalPrice());
            paymentInfo.setCreationTime(LocalDateTime.now());
            paymentInfoRepository.save(paymentInfo);
            auctionRegisterRepository.save(auctionRegister);
            jewelryNames.add(auctionRegister.getLot().getProduct().getName());
        }

        if (!auctionRegisterIds.isEmpty()){
            AuctionRegister auctionRegister = auctionRegisterRepository.findById(auctionRegisterIds.get(0)).get();
            Member member = auctionRegister.getMember();
            iNotifyService.insertNotify(member,
                    MessageProvider.PaymentService.winnerPaymentSuccessTitle,
                    MessageProvider.PaymentService.winnerPaymentSuccessDescription(jewelryNames),
                    null,null
                    );
        }
    }

    @Override
    public AuctionRegisterDTO confirmProductDelivery(Integer auctionRegisterId) {
        AuctionRegister auctionRegister = auctionRegisterRepository.findById(auctionRegisterId).get();
        if(auctionRegister.getStatus() == AuctionRegisterStatus.WINNER_PURCHASED){
            auctionRegister.setStatus(AuctionRegisterStatus.DELIVERED);
            auctionRegisterRepository.save(auctionRegister);
            Notify notify = new Notify();
            notify.setMember(auctionRegister.getMember());
            notify.setTitle("Your product has been delivered");
            notify.setDescription("Your product has has been delivered. Please check your won jewelry");
            notify.setNotifiableId(auctionRegister.getLot().getId());
            return AuctionRegisterMapper.toAuctionRegisterDTO(auctionRegister);
        }else {
            throw new RuntimeException("Auction register is not in WINNER_PURCHASED status");
        }
    }

    @Override
    public List<AuctionRegister> getAuctionRegisterByMemberId(Integer memberId) {
        return auctionRegisterRepository.findAuctionRegisterByMemberId(memberId);
    }

    @Override
    public List<AuctionRegister> getPurchasedAuctionRegister() {
        return auctionRegisterRepository.findByStatus(AuctionRegisterStatus.WINNER_PURCHASED);
    }

    @Override
    public AuctionRegister getPurchasedAuctionRegisterById(Integer id) {
        AuctionRegister auctionRegister = auctionRegisterRepository.findByIdAndStatus(id, AuctionRegisterStatus.WINNER_PURCHASED);
        if(auctionRegister != null){
            return auctionRegister;
        }else{
            throw new RuntimeException("Auction register is not in WINNER_PURCHASED status");
        }

    }

    @Override
    public List<AuctionRegister> getDeliveredAuctionRegister() {
        return auctionRegisterRepository.findByStatus(AuctionRegisterStatus.DELIVERED);
    }

    @Override
    public AuctionRegister getDeliveredAuctionRegisterById(Integer id) {
        AuctionRegister auctionRegister = auctionRegisterRepository.findByIdAndStatus(id, AuctionRegisterStatus.DELIVERED);
        if(auctionRegister != null){
            return auctionRegister;
        }else{
            throw new RuntimeException("Auction register is not in DELIVERED status");
        }
    }

    @Override
    public List<AuctionRegister> getMembersInLot(Integer lotId) {

        return auctionRegisterRepository.findByLotId(lotId);
    }


}
