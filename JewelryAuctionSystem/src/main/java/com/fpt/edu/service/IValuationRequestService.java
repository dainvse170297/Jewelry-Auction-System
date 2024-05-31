package com.fpt.edu.service;

import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.enums.ValuationRequestStatus;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface IValuationRequestService {
    public ValuationRequestDTO create(ValuationRequestDTO valuationRequestDTO);

    public List<ValuationRequestDTO> getRequestedValuationRequest();

    public Map<String,String> sendRequestValuationToManager(Integer id);
}