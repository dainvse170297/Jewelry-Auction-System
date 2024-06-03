package com.fpt.edu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BidDTO {
    private Integer id;
    private MemberDTO member;
    private LotDTO lot;
    private BigDecimal price;
    private LocalDate time;
}
