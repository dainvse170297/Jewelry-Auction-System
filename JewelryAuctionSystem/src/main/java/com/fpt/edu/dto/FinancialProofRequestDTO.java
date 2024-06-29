package com.fpt.edu.dto;


import com.fpt.edu.entity.FinancialProofImage;
import com.fpt.edu.status.FinancialProofRequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinancialProofRequestDTO {

    private Integer id;
    private Integer memberId;
    private Integer staffId;
    private Integer managerId;
    private LocalDateTime timeRequest;
    private FinancialProofRequestStatus status;
    private BigDecimal financialProofAmount;
    private Set<String> financialProofImages;

}
