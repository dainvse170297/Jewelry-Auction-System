package com.fpt.edu.service;

import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.Notify;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.enums.ValuationRequestStatus;
import com.fpt.edu.mapper.ValuationRequestMapper;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.repository.INotifyRepository;
import com.fpt.edu.repository.IValuationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ValuationRequestService implements IValuationRequestService{

    private final IValuationRequestRepository iValuationRequestRepository;
    private final IMemberRepository iMemberRepository;
    private final ValuationRequestMapper valuationRequestMapper;
    private final INotifyRepository iNotifyRepository;

    private final String RECEIVED_TITLE = "Product Received";
    private final String RECEIVED_MESSAGE = "Your product has been received. We will contact you soon.";

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
        Member member = valuationRequest.getMember();
        Notify notify = new Notify();
        notify.setMember(member);
        notify.setTitle(RECEIVED_TITLE);
        notify.setDescription(RECEIVED_MESSAGE);
        notify.setDate(LocalDate.now());
        iNotifyRepository.save(notify);
        return valuationRequestMapper.mapToValuationRequestDTO(iValuationRequestRepository.save(valuationRequest));
    }
}
