package com.fpt.edu.mapper;

import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.repository.IMemberRepository;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Component
public class ValuationRequestMapper {

    private IMemberRepository iMemberRepository;

    public ValuationRequestDTO mapToValuationRequestDTO(ValuationRequest valuationRequest){
        return new ValuationRequestDTO(
                valuationRequest.getId(),
                valuationRequest.getMember().getId(),
                valuationRequest.getTimeRequest(),
                valuationRequest.getValuationStatus(),
                valuationRequest.getEstimatePriceMax(),
                valuationRequest.getEstimatePriceMin(),
                valuationRequest.getDescription(),
                valuationRequest.getProducts(),
                valuationRequest.getResponseRequestValuations(),
                valuationRequest.getValuationImages()
        );
    }

    public ValuationRequest mapToValuationRequest(ValuationRequestDTO valuationRequestDTO){
        return new ValuationRequest(
                valuationRequestDTO.getId(),
                iMemberRepository.getReferenceById(valuationRequestDTO.getMemberId()),
                valuationRequestDTO.getTimeRequest(),
                valuationRequestDTO.getValuationStatus(),
                valuationRequestDTO.getEstimatePriceMax(),
                valuationRequestDTO.getEstimatePriceMin(),
                valuationRequestDTO.getDescription(),
                valuationRequestDTO.getProducts(),
                valuationRequestDTO.getResponseRequestValuations(),
                valuationRequestDTO.getValuationImages()
        );
    }
}
