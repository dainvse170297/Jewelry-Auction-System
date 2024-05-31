package com.fpt.edu.service;

import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.enums.ValuationRequestStatus;
import com.fpt.edu.mapper.ValuationRequestMapper;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.repository.IValuationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    public ValuationRequestService(IMemberRepository iMemberRepository,
                                   IValuationRequestRepository iValuationRequestRepository,
                                   ValuationRequestMapper valuationRequestMapper) {
        this.iMemberRepository = iMemberRepository;
        this.iValuationRequestRepository = iValuationRequestRepository;
        this.valuationRequestMapper = valuationRequestMapper;
    }



    @Override
    public ValuationRequestDTO create( ValuationRequestDTO valuationRequestDTO) {
        //  Member member = iMemberRepository.getReferenceById(valuationRequestDTO.getMemberId());
        // map sang entity de luu
        ValuationRequest valuationRequest = valuationRequestMapper.mapToValuationRequest(valuationRequestDTO);
        ValuationRequest savedRequest =  iValuationRequestRepository.save(valuationRequest);

        return valuationRequestMapper.mapToValuationRequestDTO(savedRequest);
    }

    @Override
    public List<ValuationRequestDTO> getRequestedValuationRequest() {
        return valuationRequestMapper.mapToValuationRequestDTOList(iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.REQUESTED));
    }
}
