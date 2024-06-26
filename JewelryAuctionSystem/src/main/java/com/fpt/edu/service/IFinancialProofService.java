package com.fpt.edu.service;

import com.fpt.edu.dto.FinancialProofRequestDTO;
import com.fpt.edu.entity.FinancialProofImage;
import com.fpt.edu.entity.FinancialProofRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

public interface IFinancialProofService {

    ResponseEntity<String> checkAvailableFinancialProofRequest(Integer memberId);

     FinancialProofRequestDTO createFinancialProofRequest(Integer memberId, Set<MultipartFile> files);

    Set<FinancialProofRequestDTO> getAllFinancialProofRequest();

    FinancialProofRequestDTO getFinancialProofRequestById(Integer id);

    FinancialProofRequestDTO updateFinancialProofRequest(Integer idRq, Integer staffId, BigDecimal financialProofAmount);

    FinancialProofRequestDTO rejectFinancialProofRequest(Integer idRq, String username);

    List<FinancialProofRequestDTO> getPendingApproval();

    FinancialProofRequestDTO confirmVip(Integer idRq, Integer managerId, boolean confirm);

}


