package com.fpt.edu.mapper;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.dto.ProductDTO;
import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.entity.Product;

public class LotM {
    public static LotDTO mapToDTO(Lot lot) {
        return LotDTO.builder()
                .id(lot.getId())
                .product(new ProductDTO())
                .auctionSession(new AuctionSession())
                .build();
    }
    public static Lot mapToLot(LotDTO lotDTO) {
        return new Lot();
    }
}
