package com.fpt.edu.dto;


import com.fpt.edu.entity.Staff;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.status.ResponseValuationRequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseRequestValuationDTO {

    private Integer id;
    private ValuationRequest valuationRequest;
    private ResponseValuationRequestStatus status;
    private BigDecimal valuationPrice;
    private LocalDate timeResponse;
    private Staff staff;

}