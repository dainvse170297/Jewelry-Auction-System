package com.fpt.edu.service;


import com.fpt.edu.dto.BidDTO;
import com.fpt.edu.entity.Bid;
import com.fpt.edu.repository.IBidRepository;
import com.fpt.edu.repository.ILotRepository;
import com.fpt.edu.repository.IMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BidService implements IBidService {

        private final IMemberRepository iMemberRepository;
        private final ILotRepository iLotRepository;
        private final IBidRepository iBidRepository;
        @Override
        public Bid placeforBid(BigDecimal price, Integer memberId, Integer lotId) {
             Bid bid = new Bid();
                bid.setPrice(price);
                bid.setMember(iMemberRepository.findById(memberId).get());
                bid.setLot(iLotRepository.findById(lotId).get());
                bid.setTime(LocalDateTime.now());
                iBidRepository.save(bid);
                Bid bids =  iBidRepository.findByMemberIdAndLotId(memberId,lotId);
                return bids;

        }


}
