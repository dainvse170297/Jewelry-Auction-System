package com.fpt.edu.service;

import com.fpt.edu.dto.ResponseRequestValuationDTO;
import com.fpt.edu.entity.Staff;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.status.ResponseValuationRequestStatus;

import java.math.BigDecimal;

public interface IResponseRequestValuationService {
    ResponseRequestValuationDTO insertResponseRequestValuation(ResponseValuationRequestStatus status, BigDecimal valuationPriceMin, BigDecimal valuationPriceMax, Staff staff, ValuationRequest valuationRequest);
}
