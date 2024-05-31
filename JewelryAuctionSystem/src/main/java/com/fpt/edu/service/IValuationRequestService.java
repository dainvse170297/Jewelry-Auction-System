package com.fpt.edu.service;

import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.enums.ValuationRequestStatus;

import java.math.BigDecimal;
import java.util.List;

public interface IValuationRequestService {
    public ValuationRequestDTO create(ValuationRequestDTO valuationRequestDTO);

    public List<ValuationRequestDTO> getRequestedValuationRequest();
}