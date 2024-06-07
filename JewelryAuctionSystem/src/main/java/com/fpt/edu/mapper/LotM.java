package com.fpt.edu.mapper;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.entity.Lot;

public class LotM {
    public static LotDTO mapToDTO(Lot lot) {
        return new LotDTO(
                lot.getId(),
                ProductM.mapToDTO(lot.getProduct()),
                AuctionSessionM.mapToDTO(lot.getAuctionSession()),
                lot.getCurrentPrice(),
                lot.getStatus()
        );
    }
    public static Lot mapToEntity(LotDTO lotDTO) {
        return new Lot(
                lotDTO.getId(),
                ProductM.mapToEntity(lotDTO.getProductDTO1()),
                AuctionSessionM.maptoEntity(lotDTO.getAuctionSession()),
                lotDTO.getCurrentPrice(),
                lotDTO.getStatus()


        );
    }
}
