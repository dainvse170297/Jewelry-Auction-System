package com.fpt.edu.mapper;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.dto.ProductDTO;
import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.entity.Product;

public class LotM {
    public static LotDTO mapToDTO(Lot lot) {
        return new LotDTO(
                lot.getId(),
                ProductMapper.mapToDTO(lot.getProduct()),
                AuctionSessionM.mapToDTO(lot.getAuctionSession()),
                lot.getCurrentPrice(),
                lot.getStatus()
        );
    }
    public static Lot mapToEntity(LotDTO lotDTO) {
        return new Lot(
                lotDTO.getId(),
                ProductMapper.mapToEntity(lotDTO.getProduct()),
                AuctionSessionM.maptoEntity(lotDTO.getAuctionSession()),
                lotDTO.getCurrentPrice(),
                lotDTO.getStatus()


        );
    }
}
