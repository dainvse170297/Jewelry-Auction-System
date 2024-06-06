package com.fpt.edu.controller;

import com.fpt.edu.dto.ResponseRequestValuationDTO;
import com.fpt.edu.service.ResponseValuationRequestService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/response")
@AllArgsConstructor
public class ResponseValuationRequestController {

        private  final ResponseValuationRequestService responseValuationRequestService;
        @PostMapping("/confirm-final-valuation-by-member")
        public ResponseEntity<ResponseRequestValuationDTO> confirmFinalValuation(@RequestParam("id") Integer id, // id response
                                                                                 @RequestParam("status") Boolean status ) { // status response

            return ResponseEntity.ok(responseValuationRequestService.confirmFinalValuationByMember(id,status));
        }
}
