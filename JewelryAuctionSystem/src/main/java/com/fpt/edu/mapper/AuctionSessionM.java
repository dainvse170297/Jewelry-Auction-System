package com.fpt.edu.mapper;

import com.fpt.edu.dto.AuctionSessionDTO;
import com.fpt.edu.dto.StaffDTO;
import com.fpt.edu.entity.AuctionSession;

public class AuctionSessionM {
    public static AuctionSession getAuctionSession(AuctionSessionDTO sessionDTO){
        return new AuctionSession();
    }
    public static AuctionSessionDTO getAuctionSessionDTO(AuctionSession session){
        return AuctionSessionDTO.builder()
                        .id(session.getId())
                        .staffDTO(new StaffDTO())
                        .build();

    }
}
