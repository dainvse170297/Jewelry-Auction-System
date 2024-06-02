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
@CrossOrigin(origins = "*")
public class ValuationRequestController {

        private final ValuationRequestService valuationRequestService;

        //Member create valuation request by description and estimate price
        @PostMapping("/create")

        public ResponseEntity<ValuationRequestDTO> addValuationRequest(@RequestParam("memberId") Integer memberId,
                                                                       @RequestParam("description") String description,
                                                                       @RequestParam("estimateMin") BigDecimal estimateMin,
                                                                       @RequestParam("estimateMax") BigDecimal estimateMax
                                                                    ) throws IOException {
            System.out.println("Time:" + System.currentTimeMillis() + " - " + memberId + " - " + description + " - " + estimateMin + " - " + estimateMax);
            return ResponseEntity.ok(valuationRequestService.create(memberId, description, estimateMin, estimateMax));
        }

        @GetMapping("/requested")
        public ResponseEntity<List<ValuationRequestDTO>> getRequestedValuationRequest() {
            return ResponseEntity.ok().build();
        }

        @PostMapping("/product-received")
        public ResponseEntity<ValuationRequestDTO> productReceived(@RequestParam("id") Integer id) {
            return ResponseEntity.ok(valuationRequestService.productReceived(id));
        }


        @PostMapping("/preliminary-valuation")
        public ResponseEntity<ValuationRequestDTO> preliminaryValuation(@RequestParam("id") Integer id,
                                                                        @RequestParam("estimateMin") BigDecimal estimatePrice,
                                                                        @RequestParam("estimateMax") BigDecimal estimateMax) {
            return ResponseEntity.ok(valuationRequestService.preliminaryValuation(id, estimatePrice, estimateMax));
        }

        @GetMapping("/request/status/product-received")
        public ResponseEntity<List<ValuationRequestDTO>> getRequestStatusProductReceived() {
            return ResponseEntity.ok(valuationRequestService.getRequestStatusProductReceived());
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
