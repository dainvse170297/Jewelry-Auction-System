package com.fpt.edu.mapper;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.entity.AuctionRegister;
import com.fpt.edu.entity.Lot;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class LotMapper {

        public LotDTO toLotDTO(Lot lot) {
            LotDTO lotDTO = new LotDTO();
            lotDTO.setId(lot.getId());
            lotDTO.setProductId(lot.getProduct().getId());
            lotDTO.setProductName(lot.getProduct().getName());
            lotDTO.setCurrentPrice(lot.getCurrentPrice()==null? BigDecimal.ZERO:lot.getCurrentPrice());
            lotDTO.setEstimatePriceMin(lot.getProduct().getEstimatePriceMin());
            lotDTO.setEstimatePriceMax(lot.getProduct().getEstimatePriceMax());
            lotDTO.setDescription(lot.getProduct().getDescription());
            if (lot.getAuctionSession() != null) lotDTO.setEndTime(lot.getAuctionSession().getEndTime());
            lotDTO.setProductImages(lot.getProduct().getProductImages());
            lotDTO.setStatus(lot.getStatus());
            lotDTO.setNumberOfRegister(lot.getAuctionRegisters().size());
            lotDTO.setEstimatePriceMin(lot.getProduct().getEstimatePriceMin());
            lotDTO.setEstimatePriceMax(lot.getProduct().getEstimatePriceMax());
            lotDTO.setBuyNowPrice(lot.getBuyNowPrice());
            lotDTO.setPricePerStep(lot.getPricePerStep());
            lotDTO.setMaxStep(lot.getMaxStep());
            lotDTO.setStartPrice(lot.getStartPrice());
            return lotDTO;
        }
    public List<LotDTO> toLotDTOS(List<Lot> lots) {
        return lots.stream().map(this::toLotDTO).toList();
    }

}
