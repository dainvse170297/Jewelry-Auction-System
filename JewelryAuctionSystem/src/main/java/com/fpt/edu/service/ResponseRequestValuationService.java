package com.fpt.edu.service;

import com.fpt.edu.dto.ResponseRequestValuationDTO;
import com.fpt.edu.entity.ResponseRequestValuation;
import com.fpt.edu.mapper.ResponseValuationRequestMapper;
import com.fpt.edu.repository.IResponseRequestValuationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResponseRequestValuationService implements IResponseRequestValuationService{

    private final IResponseRequestValuationRepository iResponseRequestValuationRepository;
    private final ResponseValuationRequestMapper ResponseValuationRequestMapper;

    @Override
    public ResponseRequestValuationDTO viewMyResponseRequestValuation(Integer responseId) {

        ResponseRequestValuation responseRequestValuation
                = iResponseRequestValuationRepository.getReferenceById(responseId);
        return ResponseValuationRequestMapper.MaptoResponseRequestValuationDTO(responseRequestValuation);
    }

}
