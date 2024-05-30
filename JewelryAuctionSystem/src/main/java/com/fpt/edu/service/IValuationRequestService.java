package com.fpt.edu.service;

import com.fpt.edu.pojo.ValuationRequest;

import java.math.BigDecimal;

public interface IValuationRequestService {
    public ValuationRequest create(Integer memberId, String description, BigDecimal estimateMin, BigDecimal estimateMax);
}