package com.fpt.edu.service;

import com.fpt.edu.dto.ProductDTO;
import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.Product;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.enums.ValuationRequestStatus;
import com.fpt.edu.mapper.ProductMapper;
import com.fpt.edu.mapper.ValuationRequestMapper;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.repository.IValuationRequestRepository;
import com.fpt.edu.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ValuationRequestService implements IValuationRequestService {

    private final IValuationRequestRepository iValuationRequestRepository;
    private final IMemberRepository iMemberRepository;

    @Override
    public ValuationRequestDTO create(Integer memberId, String description, BigDecimal estimateMin, BigDecimal estimateMax) {
        ValuationRequest valuationRequest = new ValuationRequest();
        Member member = iMemberRepository.getReferenceById(memberId);

        valuationRequest.setMember(member);
        valuationRequest.setDescription(description);
        valuationRequest.setEstimatePriceMin(estimateMin);
        valuationRequest.setEstimatePriceMax(estimateMax);
        valuationRequest.setResponseRequestValuations(null);
        valuationRequest.setValuationStatus(ValuationRequestStatus.REQUESTED);
//        System.out.println("Member: " + member);
//        System.out.println("Have: " +
//                "Member id: " + memberId +
//                "Des: " + description +
//                "Estimate min: " + estimateMin +
//                "Estimate max: " + estimateMax);
        return ValuationRequestMapper.mapToValuationRequestDTO(iValuationRequestRepository.save(valuationRequest));
    }


    public List<ValuationRequestDTO> getRequestedValuationRequestByMemberStatus(ValuationRequestStatus valuationStatus) {
        List<ValuationRequestDTO> valuationRequestDTOList = new ArrayList<>();
        List<ValuationRequest> valuationRequestList = iValuationRequestRepository.findByValuationStatus(valuationStatus);
        for (ValuationRequest valuationRequest : valuationRequestList) {
            valuationRequestDTOList.add(ValuationRequestMapper.mapToValuationRequestDTO(valuationRequest));
            return valuationRequestDTOList;
        }
        return List.of();
    }

    public ValuationRequestDTO getValuationRequestById(Integer id) {
        ValuationRequest valuationRequest = iValuationRequestRepository.findById(id).orElseThrow(() -> new NoSuchElementException("NO EXIST ID:" + id));
        return ValuationRequestMapper.mapToValuationRequestDTO(valuationRequest);
    }


}

