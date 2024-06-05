package com.fpt.edu.service;

import com.fpt.edu.dto.ResponseRequestValuationDTO;
import com.fpt.edu.entity.ResponseRequestValuation;
import com.fpt.edu.entity.Staff;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.mapper.ResponseValuationRequestMapper;
import com.fpt.edu.repository.IResponseRequestValuationRepository;
import com.fpt.edu.status.ResponseValuationRequestStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ResponseRequestValuationService implements IResponseRequestValuationService{
    private final IResponseRequestValuationRepository iResponseRequestValuationRepository;
    private final ResponseValuationRequestMapper responseValuationRequestMapper;
    public ResponseRequestValuationDTO insertResponseRequestValuation(ResponseValuationRequestStatus status, BigDecimal valuationPriceMin, BigDecimal valuationPriceMax, Staff staff, ValuationRequest valuationRequest) {
        ResponseRequestValuation responseRequestValuation = new ResponseRequestValuation();
        responseRequestValuation.setValuationPriceMin(valuationPriceMin);
        responseRequestValuation.setValuationPriceMax(valuationPriceMax);
        responseRequestValuation.setResponseValuationRequestStatus(status);
        responseRequestValuation.setStaff(staff);
        responseRequestValuation.setValuationRequest(valuationRequest);
        responseRequestValuation.setTimeResponse(LocalDate.now());
        return responseValuationRequestMapper.toResponseValuationRequestDTO(iResponseRequestValuationRepository.save(responseRequestValuation));
    }
}
