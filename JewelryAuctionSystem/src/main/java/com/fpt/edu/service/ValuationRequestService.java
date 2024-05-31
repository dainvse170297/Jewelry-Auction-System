package com.fpt.edu.service;

import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.ValuationImage;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.enums.ValuationRequestStatus;
import com.fpt.edu.mapper.ValuationRequestMapper;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.repository.IValuationRequestRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

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

    public Map<String,String> sendRequestValuationToManager(Integer id) {
        Optional<ValuationRequest> valuationRequestOpt = iValuationRequestRepository.findById(id);
        Map<String, String> response = new HashMap<>();
        if (valuationRequestOpt.isPresent()) {

            ValuationRequest valuationRequest = valuationRequestOpt.get();
            if(valuationRequest.getValuationStatus().equals(ValuationRequestStatus.PRODUCT_RECEIVED) ){
                valuationRequest.setValuationStatus(ValuationRequestStatus.PENDING_MANAGER_APPROVAL);
                iValuationRequestRepository.save(valuationRequest);
                response.put("message", "ValuationRequest with id: " + id + " has been sent to manager for approval");
                return response;
            } else {
                response.put("message", "ValuationRequest with id: " + id + " is not in PRODUCT_RECEIVED status");
                 return  response;
               // throw new IllegalArgumentException("ValuationRequest with id: " + id + " is not in REQUESTED status");
            }

        } else {
            // Handle the case where no ValuationRequest with the given id is found
           // throw new EntityNotFoundException("No ValuationRequest found with id: " + id);
            response.put("message", "No ValuationRequest found with id: " + id);
            return  response;
        }
    }

}
