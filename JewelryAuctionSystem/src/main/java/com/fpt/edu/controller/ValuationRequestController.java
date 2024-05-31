package com.fpt.edu.controller;

import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.service.ValuationRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/valuation")
@RequiredArgsConstructor
public class ValuationRequestController {

        private final ValuationRequestService valuationRequestService;

        @PostMapping("/create")
        public ResponseEntity<ValuationRequestDTO> addValuationRequest(@RequestParam("memberId") Integer memberId,
                                                                       @RequestParam("description") String description,
                                                                       @RequestParam("estimateMin") BigDecimal estimateMin,
                                                                       @RequestParam("estimateMax") BigDecimal estimateMax
                                                                    ) throws IOException {
            return ResponseEntity.ok(valuationRequestService.create(memberId, description, estimateMin, estimateMax));
        }

        @GetMapping("/requested")
        public ResponseEntity<List<ValuationRequestDTO>> getRequestedValuationRequest() {
            return ResponseEntity.ok().build();
        }
//        @RequestMapping("/all")
//        public ResponseEntity<ValuationRequest> getAllValuationRequest() {
//            return ResponseEntity.ok().build();
//        }
//
//        @RequestMapping("/item/{id}")
//        public ResponseEntity<ValuationRequest> getValuationRequestById(@RequestParam("id") Long id) {
//            return ResponseEntity.ok().build();
//        }
}
