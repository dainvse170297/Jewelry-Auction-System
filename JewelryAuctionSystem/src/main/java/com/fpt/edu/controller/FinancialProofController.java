package com.fpt.edu.controller;

import com.fpt.edu.dto.FinancialProofRequestDTO;
import com.fpt.edu.entity.FinancialProofRequest;
import com.fpt.edu.service.FinancialProofService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@RestController
@RequestMapping("financial-proof")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class FinancialProofController {
        private final FinancialProofService financialProofService;


    @PostMapping("/check-available")
    public ResponseEntity<String> checkAvailableFinancialProofRequest(@RequestParam("memberId") Integer memberId){
        return financialProofService.checkAvailableFinancialProofRequest(memberId);
    }

    @PostMapping("/create")
    public ResponseEntity<FinancialProofRequestDTO> createFinancialProof(@RequestParam("memberId") Integer memberId,
                                                                         @RequestParam("files") Set<MultipartFile> files){
        return ResponseEntity.ok(financialProofService.createFinancialProofRequest(memberId, files));

    }

    @GetMapping("/get-all")
    public ResponseEntity<Set<FinancialProofRequestDTO>> getAllFinancialProofRequest(){
        return ResponseEntity.ok(financialProofService.getAllFinancialProofRequest());
    }

}
