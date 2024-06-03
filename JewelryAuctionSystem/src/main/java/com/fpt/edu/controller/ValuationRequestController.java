package com.fpt.edu.controller;

import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.service.ValuationRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/valuation")
@RequiredArgsConstructor
public class ValuationRequestController {

        private final ValuationRequestService valuationRequestService;
        //Member create valuation request by description and estimate price
        @PostMapping("/create")
        @CrossOrigin(origins = "*")
        public ResponseEntity<ValuationRequestDTO> addValuationRequest(@RequestParam("memberId") Integer memberId,
                                                                       @RequestParam("description") String description,
                                                                       @RequestParam("estimateMin") BigDecimal estimateMin,
                                                                       @RequestParam("estimateMax") BigDecimal estimateMax,
                                                                       @RequestParam("image") Set<MultipartFile> files
                                                                    ) throws IOException {
            return ResponseEntity.ok(valuationRequestService.create(memberId, description, estimateMin, estimateMax,files));
        }

        @GetMapping("/requested")
        @CrossOrigin(origins = "*")
        public ResponseEntity<List<ValuationRequestDTO>> getRequestedValuationRequest() {
            return ResponseEntity.ok(valuationRequestService.getRequestedValuationRequest());
        }

        @PostMapping("/product-received")
        @CrossOrigin(origins = "*")
        public ResponseEntity<ValuationRequestDTO> productReceived(@RequestParam("id") Integer id) {
            return ResponseEntity.ok(valuationRequestService.productReceived(id));
        }


        @PostMapping("/preliminary-valuation")
        @CrossOrigin(origins = "*")
        public ResponseEntity<ValuationRequestDTO> preliminaryValuation(@RequestParam("id") Integer id,
                                                                        @RequestParam("estimateMin") BigDecimal estimatePrice,
                                                                        @RequestParam("estimateMax") BigDecimal estimateMax) {
            return ResponseEntity.ok(valuationRequestService.preliminaryValuation(id, estimatePrice, estimateMax));
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
