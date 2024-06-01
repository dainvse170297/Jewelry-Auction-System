package com.fpt.edu.mapper;

import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.repository.IResponseRequestValuationRepository;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Component
public class ValuationRequestMapper {

    private final ValuationImageMapper valuationImageMapper;
    private IMemberRepository iMemberRepository;
    private IResponseRequestValuationRepository iResponseRequestValuationRepository;

    public ValuationRequestMapper(ValuationImageMapper valuationImageMapper) {
        this.valuationImageMapper = valuationImageMapper;
    }

    public ValuationRequestDTO mapToValuationRequestDTO(ValuationRequest valuationRequest){
        ResponseRequestValuation responseRequestValuation = valuationRequest.getResponseRequestValuations();
        Integer responseRequestValuationId = responseRequestValuation == null ? null : responseRequestValuation.getId();
        return new ValuationRequestDTO(
                valuationRequest.getId(),
                valuationRequest.getMember().getId(),
                valuationRequest.getTimeRequest(),
                valuationRequest.getValuationStatus(),
                valuationRequest.getEstimatePriceMax(),
                valuationRequest.getEstimatePriceMin(),
                valuationRequest.getDescription(),
                valuationRequest.getProducts(),
                responseRequestValuationId,
                valuationImageMapper.mapToValuationImageIdList(valuationRequest.getValuationImages())
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
                iResponseRequestValuationRepository.getReferenceById(valuationRequestDTO.getResponseRequestValuationsId()),
                valuationImageMapper.mapIdToValuationImageList(valuationRequestDTO.getValuationImages())
        );
    }

    public List<ValuationRequestDTO> mapToValuationRequestDTOList(List<ValuationRequest> valuationRequests){
        return valuationRequests.stream().map(this::mapToValuationRequestDTO).toList();
    }
}
