package com.fpt.edu.service;

import com.fpt.edu.dto.BidDTO;
import com.fpt.edu.entity.Bid;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;


public interface IBidService {

    public BidDTO placeForBid( Integer memberId, Integer lotId,BigDecimal price);



}
