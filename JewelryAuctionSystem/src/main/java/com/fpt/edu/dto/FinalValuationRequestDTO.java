package com.fpt.edu.dto;

import com.fpt.edu.status.ValuationRequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinalValuationRequestDTO {

    private Integer id;
    private Integer memberId;
    private LocalDateTime timeRequest;
    private ValuationRequestStatus valuationStatus;
    private String description;
    private Integer productId;

}
