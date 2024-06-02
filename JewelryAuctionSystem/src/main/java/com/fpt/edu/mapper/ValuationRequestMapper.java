package com.fpt.edu.mapper;

import com.fpt.edu.dto.MemberDTO;
import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.ValuationRequest;
import lombok.Data;

@Data
public class ValuationRequestMapper {
    public static ValuationRequestDTO mapToValuationRequestDTO(ValuationRequest valuationRequest) {
        return ValuationRequestDTO.builder()
                .id(valuationRequest.getId())
                .memberDTO(new MemberDTO())
                .build();
    }

    public static ValuationRequest mapToValuationRequest(ValuationRequestDTO valuationRequestDTO) {
        return new ValuationRequest();
    }
}


