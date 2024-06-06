package com.fpt.edu.service;

import com.fpt.edu.dto.ResponseRequestValuationDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.ResponseValuationRequestMapper;
import com.fpt.edu.repository.ILotRepository;
import com.fpt.edu.repository.IResponseRequestValuationRepository;
import com.fpt.edu.repository.IValuationRequestRepository;
import com.fpt.edu.status.LotStatus;
import com.fpt.edu.status.ResponseValuationRequestStatus;
import com.fpt.edu.status.ValuationRequestStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResponseValuationRequestService implements IResponseRequestValuationService{

    private final IResponseRequestValuationRepository iResponseRequestValuationRepository;
    private final ResponseValuationRequestMapper responseValuationRequestMapper;
    private final ILotRepository iLotRepository;
    private final IValuationRequestRepository iValuationRequestRepository;
    @Override
    public ResponseRequestValuationDTO viewMyResponseRequestValuation(Integer responseId) {

        ResponseRequestValuation responseRequestValuation
                = iResponseRequestValuationRepository.getReferenceById(responseId);
        return responseValuationRequestMapper.toResponseValuationRequestDTO(responseRequestValuation);
    }

    @Override
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

    @Override
    public ResponseRequestValuationDTO confirmFinalValuationByMember(Integer id, boolean status) { // id response 6

        ResponseRequestValuation responseValuation = iResponseRequestValuationRepository.getReferenceById(id);

        ValuationRequest valuationRequest = responseValuation.getValuationRequest();


        if(status){
            valuationRequest.setValuationStatus(ValuationRequestStatus.MEMBER_ACCEPTED);
            iValuationRequestRepository.save(valuationRequest);

            responseValuation.setResponseValuationRequestStatus(ResponseValuationRequestStatus.ACCEPTED);
            iResponseRequestValuationRepository.save(responseValuation);
            Product product = valuationRequest.getProduct();
            List<Lot> lot = iLotRepository.findLotByProduct_Id(product.getId());
            for (Lot l : lot) {
                l.setStatus(LotStatus.READY);
                iLotRepository.save(l);
            }
            return responseValuationRequestMapper.toResponseValuationRequestDTO(responseValuation);


        } else {
            responseValuation.setResponseValuationRequestStatus(ResponseValuationRequestStatus.REJECTED);
            iResponseRequestValuationRepository.save(responseValuation);
            valuationRequest.setValuationStatus(ValuationRequestStatus.PRODUCT_RECEIVED);
            iValuationRequestRepository.save(valuationRequest);

            return responseValuationRequestMapper.toResponseValuationRequestDTO(responseValuation);

        }


    }
}
