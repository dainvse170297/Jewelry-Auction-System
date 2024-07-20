package com.fpt.edu.service;

import com.fpt.edu.dto.AuctionRegisterDTO;
import com.fpt.edu.entity.AuctionRegister;

import java.math.BigDecimal;
import java.util.List;


public interface IAuctionRegisterService  {
    AuctionRegisterDTO register(AuctionRegister register);

    AuctionRegister placeToBid(Integer lotId,Integer id, BigDecimal price);

    AuctionRegisterDTO checkMemberRegister(int id, int lotId);

    List<AuctionRegister> getListWinAuctionOfMember(Integer memberId);

    void processAuctionRegisterAfterPayment(List<Integer> auctionRegisterIds);

    AuctionRegisterDTO confirmProductDelivery(Integer auctionRegisterId);

    List<AuctionRegister> getAuctionRegisterByMemberId(Integer memberId);

    List<AuctionRegister> getPurchasedAuctionRegister();

    AuctionRegister getPurchasedAuctionRegisterById(Integer id);

    List<AuctionRegister> getDeliveredAuctionRegister();

    AuctionRegister getDeliveredAuctionRegisterById(Integer id);

    List<AuctionRegister> getMembersInLot(Integer lotId);
}
