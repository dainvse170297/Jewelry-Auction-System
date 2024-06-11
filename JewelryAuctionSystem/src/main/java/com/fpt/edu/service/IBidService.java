package com.fpt.edu.service;

import com.fpt.edu.dto.BidDTO;
import com.fpt.edu.entity.Bid;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;


public interface IBidService {

    public Bid placeforBid(BigDecimal price, Integer memberId, Integer lotId);


}
