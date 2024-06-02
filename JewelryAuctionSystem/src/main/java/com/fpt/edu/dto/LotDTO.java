package com.fpt.edu.dto;

import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class LotDTO {
    private Integer id;
    private ProductDTO product;
    private AuctionSession auctionSession;
    private BigDecimal currentPrice;
    private String status;

}
