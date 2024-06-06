package com.fpt.edu.service;
import com.fpt.edu.entity.Staff;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.status.ResponseValuationRequestStatus;

import java.math.BigDecimal;
import java.util.Map;


import com.fpt.edu.dto.ResponseRequestValuationDTO;


public interface IResponseRequestValuationService {

    ResponseRequestValuationDTO viewMyResponseRequestValuation(Integer responseId);

    public Map<String,Object> getValuationResponse(Integer id);

    ResponseRequestValuationDTO insertResponseRequestValuation(ResponseValuationRequestStatus status, BigDecimal valuationPriceMin, BigDecimal valuationPriceMax, Staff staff, ValuationRequest valuationRequest);
}
