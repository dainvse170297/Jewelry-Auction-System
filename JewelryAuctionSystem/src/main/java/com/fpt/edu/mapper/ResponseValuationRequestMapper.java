package com.fpt.edu.mapper;

import com.fpt.edu.dto.ResponseRequestValuationDTO;
import com.fpt.edu.entity.ResponseRequestValuation;
import com.fpt.edu.repository.IStaffRepository;
import com.fpt.edu.repository.IValuationRequestRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ResponseValuationRequestMapper {
    private IStaffRepository iStaffRepository;
    private IValuationRequestRepository iValuationRequestRepository;
    public ResponseRequestValuationDTO toResponseValuationRequestDTO(ResponseRequestValuation responseValuationRequest) {
        ResponseRequestValuationDTO responseValuationRequestDTO = new ResponseRequestValuationDTO();
        responseValuationRequestDTO.setId(responseValuationRequest.getId());
        responseValuationRequestDTO.setValuationPriceMin(responseValuationRequest.getValuationPriceMin());
        responseValuationRequestDTO.setValuationPriceMax(responseValuationRequest.getValuationPriceMax());
        responseValuationRequestDTO.setStatus(responseValuationRequest.getResponseValuationRequestStatus());
        responseValuationRequestDTO.setStaffId(responseValuationRequest.getStaff().getId());
        responseValuationRequestDTO.setTimeResponse(responseValuationRequest.getTimeResponse());
        responseValuationRequestDTO.setValuationRequestId(responseValuationRequest.getValuationRequest().getId());
        return responseValuationRequestDTO;
    }

    public ResponseRequestValuation toResponseValuationRequest(ResponseRequestValuationDTO responseValuationRequestDTO) {
        ResponseRequestValuation responseValuationRequest = new ResponseRequestValuation();
        responseValuationRequest.setId(responseValuationRequestDTO.getId());
        responseValuationRequest.setValuationPriceMin(responseValuationRequestDTO.getValuationPriceMin());
        responseValuationRequest.setValuationPriceMax(responseValuationRequestDTO.getValuationPriceMax());
        responseValuationRequest.setResponseValuationRequestStatus(responseValuationRequestDTO.getStatus());
        responseValuationRequest.setStaff(iStaffRepository.getReferenceById(responseValuationRequestDTO.getStaffId()));
        responseValuationRequest.setValuationRequest(iValuationRequestRepository.getReferenceById(responseValuationRequestDTO.getValuationRequestId()));
        responseValuationRequest.setTimeResponse(responseValuationRequestDTO.getTimeResponse());
        return responseValuationRequest;
    }

    public List<ResponseRequestValuationDTO> toResponseValuationRequestDTOList(List<ResponseRequestValuation> responseValuationRequests) {
        return responseValuationRequests.stream().map(this::toResponseValuationRequestDTO).collect(Collectors.toList());
    }

    public List<ResponseRequestValuation> toResponseValuationRequestList(List<ResponseRequestValuationDTO> responseValuationRequestDTOs) {
        return responseValuationRequestDTOs.stream().map(this::toResponseValuationRequest).collect(Collectors.toList());
    }
}
