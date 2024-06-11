package com.fpt.edu.mapper;

import com.fpt.edu.dto.FinalValuationRequestDTO;
import com.fpt.edu.dto.ValuationRequestDTO;

import com.fpt.edu.dto.ViewDetailValuationRequestFinalApprovedDTO;

import com.fpt.edu.dto.ValuationRequestDetailDTO;

import com.fpt.edu.dto.ViewValuationRequestDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.repository.IProductRepository;
import com.fpt.edu.repository.IResponseRequestValuationRepository;

import com.fpt.edu.repository.IValuationImageRepository;
import com.fpt.edu.status.ValuationRequestStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
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

    private IValuationImageRepository iValuationImageRepository;


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
    public ValuationRequestDetailDTO mapToValuationRequestDetailDTO(ValuationRequest valuationRequest){
//        ResponseRequestValuation responseRequestValuation = valuationRequest.getResponseRequestValuations();
//        Integer responseRequestValuationId = responseRequestValuation == null ? null : responseRequestValuation.getId();
        Integer productId = valuationRequest.getProduct() == null ? null : valuationRequest.getProduct().getId();
        return new ValuationRequestDetailDTO(
                valuationRequest.getId(),
                valuationRequest.getMember().getId(),
                valuationRequest.getTimeRequest(),
                valuationRequest.getValuationStatus(),
                valuationRequest.getEstimatePriceMax(),
                valuationRequest.getEstimatePriceMin(),
                valuationRequest.getMemberEstimatePrice(),
                valuationRequest.getDescription(),
                productId,
//                responseRequestValuationId,
                valuationImageMapper.toValuationImageUrls(valuationRequest.getValuationImages())
        );
    }

    public List<ValuationRequestDetailDTO> mapToValuationRequestDetailDTOList(List<ValuationRequest> valuationRequests){
        return valuationRequests.stream().map(this::mapToValuationRequestDetailDTO).toList();
    }
//    // ham nay khong thay dung nay be Dai oi
//    public ValuationRequest mapToValuationRequest(ValuationRequestDTO valuationRequestDTO){
//        return new ValuationRequest(
//                valuationRequestDTO.getId(),
//                iMemberRepository.getReferenceById(valuationRequestDTO.getMemberId()),
//                valuationRequestDTO.getTimeRequest(),
//                valuationRequestDTO.getValuationStatus(),
//                valuationRequestDTO.getEstimatePriceMax(),
//                valuationRequestDTO.getEstimatePriceMin(),
//                valuationRequestDTO.getDescription(),
//                iProductRepository.getReferenceById(valuationRequestDTO.getProductId()),
////                iResponseRequestValuationRepository.getReferenceById(valuationRequestDTO.getResponseRequestValuationsId()),
//                valuationImageMapper.mapIdToValuationImageList(valuationRequestDTO.getValuationImages())
//        );
//    }


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
                valuationRequest.getDescription(),
                valuationRequest.getProduct().getId()
        );
    }
    public List<FinalValuationRequestDTO> mapToFinalValuationRequestDTOList(List<ValuationRequest> valuationRequests){
        return valuationRequests.stream().map(this::mapToFinalValuationRequestDTO).toList();
    }

    public ViewDetailValuationRequestFinalApprovedDTO
    mapToViewDetailValuationRequestFinalApprovedDTO(ValuationRequest valuationRequest, Product product){
        return new ViewDetailValuationRequestFinalApprovedDTO(
                valuationRequest.getId(),
                valuationRequest.getMember().getId(),
                valuationRequest.getTimeRequest(),
                valuationRequest.getValuationStatus(),
                product.getEstimatePriceMax(),
                product.getEstimatePriceMin(),
                product.getDescription(),
                product.getId(),
                product.getName(),
                product.getCategory().getName(),
                product.getProductImages()
        );

    }


}
