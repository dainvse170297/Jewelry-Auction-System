package com.fpt.edu.service;

import com.fpt.edu.dto.ValuationRequestDTO;

import java.math.BigDecimal;
import java.util.List;

public interface IValuationRequestService {
    public ValuationRequestDTO create(Integer memberId, String description, BigDecimal estimateMin, BigDecimal estimateMax);

    public List<ValuationRequestDTO> getRequestedValuationRequest();

    public ValuationRequestDTO productReceived(Integer id);

    ValuationRequestDTO preliminaryValuation(Integer id, BigDecimal estimateMin, BigDecimal estimateMax);
}