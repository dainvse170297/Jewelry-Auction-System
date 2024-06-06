package com.fpt.edu.controller;

import com.fpt.edu.service.ResponseValuationRequestService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/response")
@AllArgsConstructor
public class ResponseValuationRequestController {

    private final ResponseValuationRequestService responseValuationRequestService;

    @GetMapping("/view-valuation-response/{id}")
    public ResponseEntity<Map<String, Object>> getValuationResponseById(@PathVariable Integer id) {
        return ResponseEntity.ok(responseValuationRequestService.getValuationResponse(id));
    }
}
