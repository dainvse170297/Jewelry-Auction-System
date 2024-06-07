package com.fpt.edu.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Getter
@Setter
@NoArgsConstructor
public class BidDTO {
    private Integer id;
    private MemberDTO1 memberDTO1;
    private LotDTO lot;
    private BigDecimal price;
    private LocalDate time;


    public BidDTO(Integer id, MemberDTO1 memberDTO1, LotDTO lot, BigDecimal price, LocalDate time) {
        this.id = id;
        this.memberDTO1=memberDTO1;
        this.lot=lot;
        this.price=price;
        this.time=time;


    }


}
