package com.fpt.edu.service;
import com.fpt.edu.entity.Staff;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.status.ResponseValuationRequestStatus;

import java.math.BigDecimal;


import com.fpt.edu.dto.ResponseRequestValuationDTO;


public interface IResponseRequestValuationService {

    ResponseRequestValuationDTO viewMyResponseRequestValuation(Integer responseId);

    ResponseRequestValuationDTO insertResponseRequestValuation(ResponseValuationRequestStatus status, BigDecimal valuationPriceMin, BigDecimal valuationPriceMax, Staff staff, ValuationRequest valuationRequest);

    ResponseRequestValuationDTO confirmFinalValuationByMember(Integer id, boolean status);
}
