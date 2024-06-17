package com.fpt.edu.service;

import com.fpt.edu.dto.ResponseRequestValuationDTO;
import com.fpt.edu.entity.ResponseRequestValuation;
import com.fpt.edu.entity.Staff;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.mapper.ProductMapper;
import com.fpt.edu.mapper.ResponseValuationRequestMapper;
import com.fpt.edu.mapper.ValuationRequestMapper;
import com.fpt.edu.repository.*;
import com.fpt.edu.entity.*;
import com.fpt.edu.repository.IResponseRequestValuationRepository;
import com.fpt.edu.repository.IValuationRequestRepository;
import com.fpt.edu.status.LotStatus;
import com.fpt.edu.status.ResponseValuationRequestStatus;
import com.fpt.edu.status.ValuationRequestStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.stereotype.Service;
import com.fpt.edu.dto.ProductDTO;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ResponseValuationRequestService implements IResponseRequestValuationService{

    private final IResponseRequestValuationRepository iResponseRequestValuationRepository;
    private final IValuationRequestRepository iValuationRequestRepository;
    private final ILotRepository iLotRepository;
    private final IValuationImageRepository iValuationRequestImageRepository;

    private final ResponseValuationRequestMapper responseValuationRequestMapper;
    private final ValuationRequestMapper valuationRequestMapper;
    private final ProductMapper productMapper;



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
        responseRequestValuation.setTimeResponse(LocalDateTime.now());
        return responseValuationRequestMapper.toResponseValuationRequestDTO(iResponseRequestValuationRepository.save(responseRequestValuation));
    }

    public Map<String,Object> getValuationResponse(Integer id) {
        Map<String, Object> map = new HashMap<>();
        ValuationRequest valuationRequest = iValuationRequestRepository.getReferenceById(id);
        valuationRequest.setValuationImages(iValuationRequestImageRepository.findByRequest(valuationRequest));
        List<ResponseRequestValuationDTO> responseRequestValuationDTOS = responseValuationRequestMapper.toResponseValuationRequestDTOList(iResponseRequestValuationRepository.findByValuationRequest(valuationRequest));
        if (valuationRequest.getProduct() == null) {
            map.put("productDTO", null);
            map.put("valuationRequestDTO", valuationRequestMapper.mapToValuationRequestDetailDTO(valuationRequest));
            map.put("responseRequestValuationDTOS", responseRequestValuationDTOS);
            return map;
        } else {
            ProductDTO productDTO = productMapper.toProductDTO(valuationRequest.getProduct());
            map.put("productDTO", productDTO);
            map.put("valuationRequestDTO", valuationRequestMapper.mapToValuationRequestDetailDTO(valuationRequest));
            map.put("responseRequestValuationDTOS", responseRequestValuationDTOS);
            return map;
        }
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
