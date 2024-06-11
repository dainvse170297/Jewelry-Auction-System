package com.fpt.edu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BidDTO {
    private Integer bidId;
    private Integer memberId;
    private Integer lotId;
    private String memberName;
    private BigDecimal price;
    private LocalDateTime bidTime;
}
