package com.fpt.edu.dto;

import com.fpt.edu.status.AuctionRegisterStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionRegisterDTO {
    private Integer id;
    private Integer memberId;
    private Integer lotId;
    private AuctionRegisterStatus status;
    private BigDecimal previousPrice;
    private BigDecimal currentPrice;
    private BigDecimal finalPrice;
    private Set<Integer> paymentInfoId;
}
