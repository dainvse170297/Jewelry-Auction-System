package com.fpt.edu.mapper;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.entity.Lot;
import org.springframework.stereotype.Component;

@Component
public class LotMapper {

        public LotDTO toLotDTO(Lot lot) {
            LotDTO lotDTO = new LotDTO();
            lotDTO.setId(lot.getId());
            lotDTO.setProductId(lot.getProduct().getId());
            lotDTO.setProductName(lot.getProduct().getName());
            lotDTO.setCurrentPrice(lot.getCurrentPrice());
            lotDTO.setProductImages(lot.getProduct().getProductImages());
            lotDTO.setStatus(lot.getStatus());
            lotDTO.setNumberOfRegister(lot.getAuctionRegisters().size());
            return lotDTO;
        }
}
