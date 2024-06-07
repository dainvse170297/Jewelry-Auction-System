package com.fpt.edu.mapper;


import com.fpt.edu.dto.ValuationRequestDTO1;
import com.fpt.edu.entity.ValuationRequest;

public class ValuationRequestM {
    public static ValuationRequestDTO1 mapToDTO(ValuationRequest valuationRequest) {
        return new ValuationRequestDTO1(
                valuationRequest.getId(),
                MemberM.mapToDTO(valuationRequest.getMember()),
                valuationRequest.getTimeRequest(),
                valuationRequest.getValuationStatus(),
                valuationRequest.getEstimatePriceMax(),
                valuationRequest.getEstimatePriceMin(),
                valuationRequest.getDescription()
        );
    }

    public static ValuationRequest mapToEntity(ValuationRequestDTO1 valuationRequestDTO) {
        return new ValuationRequest(
                valuationRequestDTO.getId(),
                MemberM.mapToEntity(valuationRequestDTO.getMemberDTO1()),
                valuationRequestDTO.getTimeRequest(),
                valuationRequestDTO.getValuationStatus(),
                valuationRequestDTO.getEstimatePriceMax(),
                valuationRequestDTO.getEstimatePriceMin(),
                valuationRequestDTO.getDescription()

        );
    }
}
