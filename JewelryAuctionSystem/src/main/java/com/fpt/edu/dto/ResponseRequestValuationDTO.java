package com.fpt.edu.dto;

import com.fpt.edu.entity.Staff;
import com.fpt.edu.entity.ValuationRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseRequestValuationDTO {
    private int id;
    private ValuationRequestDTO valuationRequestID;
    private byte status;
    private BigDecimal valuationPrice;
    private LocalDate timeResponse;
    private Staff staff;
}
