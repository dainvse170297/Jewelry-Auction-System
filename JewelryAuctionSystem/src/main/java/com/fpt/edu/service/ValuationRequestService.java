package com.fpt.edu.service;

import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.Notify;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.status.ValuationRequestStatus;
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

    private final String PRELIMINARY_VALUATED_TITLE = "Product Preliminary Valuated";
    private final String PRELIMINARY_VALUATED_MESSAGE = "We have done the preliminary valuation for your product. We will contact you soon.";
    @Override
    public ValuationRequestDTO create(Integer memberId, String description, BigDecimal estimateMin, BigDecimal estimateMax) {
        ValuationRequest valuationRequest = new ValuationRequest();
        Member member = iMemberRepository.getReferenceById(memberId);
        System.out.println("Member: " + member);
        valuationRequest.setMember(member);
        valuationRequest.setDescription(description);
        valuationRequest.setEstimatePriceMin(estimateMin);
        valuationRequest.setEstimatePriceMax(estimateMax);
        valuationRequest.setResponseRequestValuations(null);
        valuationRequest.setValuationStatus(ValuationRequestStatus.REQUESTED);
        valuationRequest.setProduct(null);
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
    public ValuationRequestDTO productReceived(Integer id) {
        System.out.println("ID: " + id);
        ValuationRequest valuationRequest = iValuationRequestRepository.getReferenceById(id);
        System.out.println('1');
        valuationRequest.setValuationStatus(ValuationRequestStatus.PRODUCT_RECEIVED);
        System.out.println('2');
        Member member = iMemberRepository.getReferenceById(valuationRequestMapper.mapToValuationRequestDTO(valuationRequest).getMemberId());
        LocalDate createDate = LocalDate.now();
        System.out.println('3');
        Notify notify = new Notify();
        notify.setMember(member);
        notify.setTitle(RECEIVED_TITLE);
        notify.setDescription(RECEIVED_MESSAGE);
        notify.setDate(createDate);
        iNotifyRepository.save(notify);
        ValuationRequestDTO dto = valuationRequestMapper.mapToValuationRequestDTO(iValuationRequestRepository.save(valuationRequest));
        System.out.println("DTO: " + dto);
        return dto;
    }

    @Override
    public List<ValuationRequestDTO> getRequestStatusProductReceived() {
        List<ValuationRequestDTO> result = valuationRequestMapper.mapToValuationRequestDTOList(iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.PRODUCT_RECEIVED));
        System.out.println("Result: " + result.size());
        return result;
    }

    @Override
    public ValuationRequestDTO preliminaryValuation(Integer id, BigDecimal estimateMin, BigDecimal estimateMax) {
        ValuationRequest valuationRequest = iValuationRequestRepository.getReferenceById(id);
        valuationRequest.setValuationStatus(ValuationRequestStatus.PRELIMINARY_VALUATED);
        valuationRequest.setEstimatePriceMin(estimateMin);
        valuationRequest.setEstimatePriceMax(estimateMax);
        Member member = valuationRequest.getMember();
        Notify notify = new Notify();
        notify.setMember(member);
        notify.setTitle(PRELIMINARY_VALUATED_TITLE);
        notify.setDescription(PRELIMINARY_VALUATED_MESSAGE);
        notify.setDate(LocalDate.now());
        iNotifyRepository.save(notify);
        return valuationRequestMapper.mapToValuationRequestDTO(iValuationRequestRepository.save(valuationRequest));
    }
}
