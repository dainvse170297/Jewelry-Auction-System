package com.fpt.edu.service;

import com.fpt.edu.dto.ValuationRequestDTO;
import org.springframework.web.multipart.MultipartFile;
import com.fpt.edu.entity.ValuationRequest;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

public interface IValuationRequestService {
    public ValuationRequestDTO create(Integer memberId, String description, BigDecimal estimateMin, BigDecimal estimateMax, Set<MultipartFile> files);

    public List<ValuationRequestDTO> getRequestedValuationRequest();

    public ValuationRequestDTO productReceived(Integer id);

    public List<ValuationRequestDTO> getRequestStatusProductReceived();

    ValuationRequestDTO getRequestByIdAndStatusProductReceived(int id);

    ValuationRequestDTO preliminaryValuation(Integer id, BigDecimal estimateMin, BigDecimal estimateMax);
}