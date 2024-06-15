package com.fpt.edu.mapper;

import com.fpt.edu.dto.BidDTO;
import com.fpt.edu.entity.Bid;
import org.springframework.stereotype.Component;

@Component
public class BidMapper {

    public BidDTO mapToBidDTO(Bid bid,String memberName) {
        return new BidDTO(bid.getId(),
                bid.getMember().getId(),
                bid.getLot().getId(),
                memberName,
                bid.getPrice(),
                bid.getTime()
        );
    }



}
