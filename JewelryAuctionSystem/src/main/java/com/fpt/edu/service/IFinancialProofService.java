package com.fpt.edu.service;

import com.fpt.edu.dto.FinancialProofRequestDTO;
import com.fpt.edu.entity.FinancialProofRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public interface IFinancialProofService {

    ResponseEntity<String> checkAvailableFinancialProofRequest(Integer memberId);

     FinancialProofRequestDTO createFinancialProofRequest(Integer memberId, Set<MultipartFile> files);

    Set<FinancialProofRequestDTO> getAllFinancialProofRequest();
}
