package com.fpt.edu.dto;

import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.entity.Product;
import com.fpt.edu.enums.LotStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data

public class LotDTO {
    private Integer id;
    private ProductDTO product;
    private AuctionSessionDTO auctionSession;
    private BigDecimal currentPrice;
    private LotStatus status;

    public LotDTO() {
    }

    public LotDTO(Integer id, ProductDTO product, AuctionSessionDTO auctionSession, BigDecimal currentPrice, LotStatus status) {
        this.id = id;
        this.product = product;
        this.auctionSession = auctionSession;
        this.currentPrice = currentPrice;
        this.status = status;
    }
}
