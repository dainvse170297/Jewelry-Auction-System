package com.fpt.edu.controller;

import com.fpt.edu.service.ResponseValuationRequestService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    private final ResponseValuationRequestService responseValuationRequestService;
    private  final ResponseValuationRequestService responseValuationRequestService;


    @GetMapping("/view-valuation-response/{id}")
    public ResponseEntity<Map<String, Object>> getValuationResponseById(@PathVariable Integer id) {
        return ResponseEntity.ok(responseValuationRequestService.getValuationResponse(id));
    }

    @PostMapping("/confirm-final-valuation-by-member")
    public ResponseEntity<ResponseRequestValuationDTO> confirmFinalValuation(@RequestParam("id") Integer id,
                                                                            @RequestParam("status") Boolean status ) { // status response

        return ResponseEntity.ok(responseValuationRequestService.confirmFinalValuationByMember(id,status));
    }
}
