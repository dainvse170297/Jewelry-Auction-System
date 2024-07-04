package com.fpt.edu.controller;

import com.fpt.edu.dto.FinancialProofRequestDTO;
import com.fpt.edu.entity.FinancialProofRequest;
import com.fpt.edu.service.FinancialProofService;
import com.fpt.edu.status.FinancialProofRequestStatus;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
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
                                                                         @RequestParam("image") Set<MultipartFile> files){
        return ResponseEntity.ok(financialProofService.createFinancialProofRequest(memberId, files));

    }

    @GetMapping("/get-all")
    public ResponseEntity<Set<FinancialProofRequestDTO>> getAllFinancialProofRequest(){
        return ResponseEntity.ok(financialProofService.getAllFinancialProofRequest());
    }


    @PostMapping("/get-by-id")
    public ResponseEntity<FinancialProofRequestDTO> getFinancialProofRequestById(@RequestParam("id") Integer id){
        return ResponseEntity.ok(financialProofService.getFinancialProofRequestById(id));
    }

    @PostMapping("/set-amount")
    public ResponseEntity<FinancialProofRequestDTO> updateFinancialProofRequest(@RequestParam("id") Integer idRq,
                                                                              @RequestParam("staffId") Integer staffId,
                                                                              @RequestParam("financialProofAmount") BigDecimal financialProofAmount,
                                                                                @RequestParam("role") String role ){
        return ResponseEntity.ok(financialProofService.updateFinancialProofRequest(idRq, staffId, financialProofAmount,role));
    }
    @PostMapping("/reject")
    public ResponseEntity<FinancialProofRequestDTO> rejectFinancialProofRequest(@RequestParam("id") Integer idRq,
                                                                              @RequestParam("username") String username){
        return ResponseEntity.ok(financialProofService.rejectFinancialProofRequest(idRq, username));
    }



    @GetMapping("/pending-approval") // get all financial proof request that is pending approval
    public ResponseEntity<List<FinancialProofRequestDTO>> getPendingApproval(){
        return ResponseEntity.ok(financialProofService.getPendingApproval());
    }

    @PostMapping("/confirm-vip")
    public ResponseEntity<FinancialProofRequestDTO> confirmVip(@RequestParam("id") Integer idRq,
                                                              @RequestParam("managerId") Integer managerId,
                                                               @RequestParam("confirm") Boolean confirm){
        return ResponseEntity.ok(financialProofService.confirmVip(idRq, managerId, confirm));
    }



    @PostMapping("/financial-proof-requests")
    public ResponseEntity<Page<FinancialProofRequestDTO>> getAllFinancialProofRequests(
            @RequestParam(required = false, defaultValue = "REQUESTED") FinancialProofRequestStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<FinancialProofRequestDTO> financialProofRequestsPage = financialProofService.getAllFinancialProofRequests(status, pageable);

        return ResponseEntity.ok(financialProofRequestsPage);
    }
}
