package com.fpt.edu.mapper;

import com.fpt.edu.dto.FinalValuationRequestDTO;
import com.fpt.edu.dto.ValuationImageDTO;
import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.dto.ViewValuationRequestDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.repository.IProductRepository;
import com.fpt.edu.repository.IResponseRequestValuationRepository;
import com.fpt.edu.repository.IValuationImageRepository;
import com.fpt.edu.status.ValuationRequestStatus;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ValuationRequestMapper {

    private final ValuationImageMapper valuationImageMapper;
    private IMemberRepository iMemberRepository;
    private IResponseRequestValuationRepository iResponseRequestValuationRepository;
    private IProductRepository iProductRepository;
    private IValuationImageRepository IValuationImageRepository;
    public ValuationRequestMapper(ValuationImageMapper valuationImageMapper) {
        this.valuationImageMapper = valuationImageMapper;
    }

    public ValuationRequestDTO mapToValuationRequestDTO(ValuationRequest valuationRequest){
//        ResponseRequestValuation responseRequestValuation = valuationRequest.getResponseRequestValuations();
//        Integer responseRequestValuationId = responseRequestValuation == null ? null : responseRequestValuation.getId();
        Integer productId = valuationRequest.getProduct() == null ? null : valuationRequest.getProduct().getId();
        return new ValuationRequestDTO(
                valuationRequest.getId(),
                valuationRequest.getMember().getId(),
                valuationRequest.getTimeRequest(),
                valuationRequest.getValuationStatus(),
                valuationRequest.getEstimatePriceMax(),
                valuationRequest.getEstimatePriceMin(),
                valuationRequest.getDescription(),
                productId,
//                responseRequestValuationId,
                valuationImageMapper.mapToValuationImageIdList(valuationRequest.getValuationImages())
        );
    }

    // ham nay khong thay dung nay be Dai oi
    public ValuationRequest mapToValuationRequest(ValuationRequestDTO valuationRequestDTO){
        return new ValuationRequest(
                valuationRequestDTO.getId(),
                iMemberRepository.getReferenceById(valuationRequestDTO.getMemberId()),
                valuationRequestDTO.getTimeRequest(),
                valuationRequestDTO.getValuationStatus(),
                valuationRequestDTO.getEstimatePriceMax(),
                valuationRequestDTO.getEstimatePriceMin(),
                valuationRequestDTO.getDescription(),
                iProductRepository.getReferenceById(valuationRequestDTO.getProductId()),
//                iResponseRequestValuationRepository.getReferenceById(valuationRequestDTO.getResponseRequestValuationsId()),
                valuationImageMapper.mapIdToValuationImageList(valuationRequestDTO.getValuationImages())
        );
    }


    public List<ValuationRequestDTO> mapToValuationRequestDTOList(List<ValuationRequest> valuationRequests){
        return valuationRequests.stream().map(this::mapToValuationRequestDTO).toList();
    }


    public List<ViewValuationRequestDTO> mapToViewValuationRequestDTOList
            (Map<ValuationRequest, Set<ValuationImage>> valuationRequestImagesMap){
        return valuationRequestImagesMap.entrySet().stream().map(entry -> {
            ValuationRequest valuationRequest = entry.getKey();
            Set<ValuationImage> valuationImages = entry.getValue();
            return new ViewValuationRequestDTO(
                    valuationRequest.getId(),
                    valuationRequest.getMember().getId(),
                    valuationRequest.getTimeRequest(),
                    valuationRequest.getValuationStatus(),
                    valuationRequest.getEstimatePriceMax(),
                    valuationRequest.getEstimatePriceMin(),
                    valuationRequest.getDescription(),
                    valuationRequest.getProduct() == null ? null : valuationRequest.getProduct().getId(),
                    valuationRequest.getResponseRequestValuations()== null ? null : valuationRequest.getResponseRequestValuations().getId(),
                    valuationImages
            );
        }).collect(Collectors.toList());
    }


    public FinalValuationRequestDTO mapToFinalValuationRequestDTO(ValuationRequest valuationRequest){
        return new FinalValuationRequestDTO(
                valuationRequest.getId(),
                valuationRequest.getMember().getId(),
                valuationRequest.getTimeRequest(),
                valuationRequest.getValuationStatus(),
                valuationRequest.getEstimatePriceMax(),
                valuationRequest.getEstimatePriceMin(),
                valuationRequest.getDescription(),
                valuationRequest.getProduct().getId()
        );
    }
    public List<FinalValuationRequestDTO> mapToFinalValuationRequestDTOList(List<ValuationRequest> valuationRequests){
        return valuationRequests.stream().map(this::mapToFinalValuationRequestDTO).toList();
    }


}
