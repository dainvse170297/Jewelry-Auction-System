package com.fpt.edu.service;

import com.fpt.edu.dto.AuctionRegisterDTO;
import com.fpt.edu.entity.AuctionRegister;
import com.fpt.edu.entity.FinancialProofRequest;
import com.fpt.edu.mapper.AuctionRegisterMapper;
import com.fpt.edu.repository.IAuctionRegisterRepository;
import com.fpt.edu.repository.IFinancialProofRequestRepository;
import com.fpt.edu.status.AuctionRegisterStatus;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@AllArgsConstructor
public class AuctionRegisterService implements IAuctionRegisterService {
    @Autowired
    private IAuctionRegisterRepository auctionRegisterRepository;
    @Autowired
    private IFinancialProofRequestRepository financialProofRequestRepository;

    @Override
    public AuctionRegisterDTO registration(AuctionRegister register) {

        register.setStatus(AuctionRegisterStatus.REGISTERED);
        register = auctionRegisterRepository.save(register);
        return AuctionRegisterMapper.toAuctionRegisterDTO(register);
    }

    @Override
    public AuctionRegisterDTO placetobid(AuctionRegister register,Integer id) {
            FinancialProofRequest financialProofRequest=financialProofRequestRepository.getReferenceById(id);

        if (financialProofRequest.getFinancialProofAmount().compareTo(register.getCurrentPrice())>0) {
            if(register.getCurrentPrice().compareTo(register.getPreviousPrice())>0){
                register.setFinalPrice(register.getCurrentPrice());
                register.setPreviousPrice(register.getCurrentPrice());
                register.setStatus(AuctionRegisterStatus.REGISTERED);
                register = auctionRegisterRepository.save(register);
                return AuctionRegisterMapper.toAuctionRegisterDTO(register);
            }
        } else {
            System.out.println("not enough money");
        }

        return null;
    }

}
