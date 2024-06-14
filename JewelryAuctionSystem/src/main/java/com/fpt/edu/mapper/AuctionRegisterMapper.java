package com.fpt.edu.mapper;

import com.fpt.edu.dto.AuctionRegisterDTO;
import com.fpt.edu.entity.AuctionRegister;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AuctionRegisterMapper {
    public static AuctionRegisterDTO toAuctionRegisterDTO(AuctionRegister auctionRegister) {
        AuctionRegisterDTO auctionRegisterDTO = new AuctionRegisterDTO();
        auctionRegisterDTO.setId(auctionRegister.getId());
        auctionRegisterDTO.setMemberId(auctionRegister.getMember().getId());
        auctionRegisterDTO.setLotId(auctionRegister.getLot().getId());
        auctionRegisterDTO.setStatus(auctionRegister.getStatus());
        auctionRegisterDTO.setPreviousPrice(auctionRegister.getPreviousPrice());
        auctionRegisterDTO.setCurrentPrice(auctionRegister.getCurrentPrice());
        auctionRegisterDTO.setFinalPrice(auctionRegister.getFinalPrice());
        auctionRegister.getPaymentInfos().forEach(paymentInfo -> auctionRegisterDTO.getPaymentInfoId().add(paymentInfo.getId()));
        return auctionRegisterDTO;
    }

    public List<AuctionRegisterDTO> toAuctionRegisterDTOList(List<AuctionRegister> registers) {
        return registers.stream().map(AuctionRegisterMapper::toAuctionRegisterDTO).toList();
    }
}
