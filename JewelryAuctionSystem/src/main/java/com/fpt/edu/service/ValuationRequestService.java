package com.fpt.edu.service;

import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.enums.ValuationRequestStatus;
import com.fpt.edu.mapper.ValuationRequestMapper;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.repository.IValuationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ValuationRequestService implements IValuationRequestService{

    private final IValuationRequestRepository iValuationRequestRepository;
    private final IMemberRepository iMemberRepository;
    private final ValuationRequestMapper valuationRequestMapper;

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
        return valuationRequestMapper.mapToValuationRequestDTO(iValuationRequestRepository.save(valuationRequest));
    }

    @Override
    public List<ValuationRequestDTO> getRequestedValuationRequest() {
        return valuationRequestMapper.mapToValuationRequestDTOList(iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.REQUESTED));
    }

    @Override
    public ValuationRequestDTO productReceived(Long id) {
        ValuationRequest valuationRequest = iValuationRequestRepository.findById(id);
        valuationRequest.setValuationStatus(ValuationRequestStatus.PRODUCT_RECEIVED);
        return valuationRequestMapper.mapToValuationRequestDTO(iValuationRequestRepository.save(valuationRequest));
    }
}
