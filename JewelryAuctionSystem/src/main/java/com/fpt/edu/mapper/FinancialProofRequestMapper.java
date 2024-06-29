package com.fpt.edu.mapper;

import com.fpt.edu.dto.FinancialProofRequestDTO;
import com.fpt.edu.entity.FinancialProofImage;
import com.fpt.edu.entity.FinancialProofRequest;
import com.fpt.edu.status.FinancialProofRequestStatus;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class FinancialProofRequestMapper {


    public FinancialProofRequestDTO mapToFinancialProofRequestDTO(FinancialProofRequest financialProofRequest) {
        return new FinancialProofRequestDTO(
                financialProofRequest.getId(),
                financialProofRequest.getMember().getId(),
                financialProofRequest.getStaff() != null ? financialProofRequest.getStaff().getId() : null,
                financialProofRequest.getManager() != null ? financialProofRequest.getManager().getId() : null,
                financialProofRequest.getTimeRequest(),
                financialProofRequest.getStatus(),
                financialProofRequest.getFinancialProofAmount(),
                mapToFinancialProofImageUrls(financialProofRequest.getFinancialProofImages())


        );
    }


    public Set<String> mapToFinancialProofImageUrls(Set<FinancialProofImage> financialProofImages) {
        return financialProofImages.stream().map(FinancialProofImage::getImageUrl).collect(Collectors.toSet());
    }


}


