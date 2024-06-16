package com.fpt.edu.service;

import com.fpt.edu.dto.AuctionRegisterDTO;
import com.fpt.edu.entity.AuctionRegister;

import java.math.BigDecimal;

public interface IAuctionRegisterService  {
    AuctionRegisterDTO register(AuctionRegister register);

    AuctionRegister placeToBid(Integer lotId,Integer id, BigDecimal price);

    boolean checkMemberRegister(int id, int lotId);
}
