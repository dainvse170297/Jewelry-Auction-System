package com.fpt.edu.service;

import com.fpt.edu.dto.BidDTO;
import com.fpt.edu.entity.Bid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;


public interface IBidService {

    public ResponseEntity<BidDTO> placeForBid(Integer memberId, Integer lotId, BigDecimal price);

    public List<BidDTO> getListBidByLotIdWithTimeDesc(Integer lotId);


}
