package com.fpt.edu.dto;

import com.fpt.edu.status.LotStatus;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Data
@Getter
@Setter
public class LotDTO {
    private Integer id;
    private ProductDTO1 productDTO1;
    private AuctionSessionDTO auctionSession;
    private BigDecimal currentPrice;
    private LotStatus status;

    public LotDTO(Integer id, ProductDTO1 productDTO1, AuctionSessionDTO auctionSession, BigDecimal currentPrice, LotStatus status) {
        this.id = id;
        this.productDTO1 = productDTO1;
        this.auctionSession = auctionSession;
        this.currentPrice = currentPrice;
        this.status = status;
    }


}
