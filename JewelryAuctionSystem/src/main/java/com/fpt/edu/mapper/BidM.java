package com.fpt.edu.mapper;

import com.fpt.edu.dto.BidDTO;
import com.fpt.edu.entity.Bid;

public class BidM {
    public static BidDTO mapToDTO(Bid b){
        return new BidDTO(
                b.getId(),
                MemberM.mapToDTO(b.getMember()),
                LotM.mapToDTO(b.getLot()),
                b.getPrice(),
                b.getTime()
        );
    }
    public static Bid mapToEntity(BidDTO b){
        return new Bid(
                b.getId(),
                MemberM.mapToEntity(b.getMemberDTO1()),
                LotM.mapToEntity(b.getLot()),
                b.getPrice(),
                b.getTime()
        );
    }
}
