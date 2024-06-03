package com.fpt.edu.mapper;

import com.fpt.edu.dto.MemberDTO;
import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.ValuationRequest;
import lombok.Data;

@Data
public class ValuationRequestMapper {
    public static ValuationRequestDTO mapToDTO(ValuationRequest valuationRequest) {
        return new ValuationRequestDTO(
                valuationRequest.getId(),
                MemberM.mapToDTO(valuationRequest.getMember()),
                valuationRequest.getTimeRequest(),
                valuationRequest.getValuationStatus(),
                valuationRequest.getEstimatePriceMax(),
                valuationRequest.getEstimatePriceMin(),
                valuationRequest.getDescription()
        );
    }

    public static ValuationRequest mapToEntity(ValuationRequestDTO valuationRequestDTO) {
        return new ValuationRequest(
                valuationRequestDTO.getId(),
                MemberM.mapToEntity(valuationRequestDTO.getMemberDTO()),
                valuationRequestDTO.getTimeRequest(),
                valuationRequestDTO.getValuationStatus(),
                valuationRequestDTO.getEstimatePriceMax(),
                valuationRequestDTO.getEstimatePriceMin(),
                valuationRequestDTO.getDescription()

        );
    }
}


