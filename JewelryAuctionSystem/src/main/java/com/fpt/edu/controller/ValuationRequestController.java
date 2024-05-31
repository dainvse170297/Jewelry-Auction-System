package com.fpt.edu.controller;

import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.service.ValuationRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/valuation")
@RequiredArgsConstructor
public class ValuationRequestController {

        @Autowired
        private final ValuationRequestService valuationRequestService;

        @PostMapping("/create")
        public ResponseEntity<ValuationRequestDTO>
        addValuationRequest(@RequestBody ValuationRequestDTO valuationRequestDTO)  {
            //System.out.println(valuationRequestDTO.getMemberId());
            return ResponseEntity.ok(valuationRequestService.create(valuationRequestDTO));

        }

        @GetMapping("/requested")
        public ResponseEntity<List<ValuationRequestDTO>> getRequestedValuationRequest() {
            return ResponseEntity.ok().build();
        }
    // nhận id request

    //trả về thông báo thành công
        @PostMapping("/sendToManager/{id}")
        public ResponseEntity<Map<String,String>> sendRequestToManager(@PathVariable Integer id) {

            return new ResponseEntity<>(valuationRequestService.sendRequestValuationToManager(id)
                    , HttpStatus.OK);

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
