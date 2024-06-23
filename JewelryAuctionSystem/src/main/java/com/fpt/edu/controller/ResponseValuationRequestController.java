package com.fpt.edu.controller;

import com.fpt.edu.service.ResponseValuationRequestService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fpt.edu.dto.ResponseRequestValuationDTO;
import com.fpt.edu.service.ResponseValuationRequestService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@RestController
@RequestMapping("/response")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ResponseValuationRequestController {

    private final ResponseValuationRequestService responseValuationRequestService;

    @GetMapping("/view-valuation-response/{id}")
    public ResponseEntity<Map<String, Object>> getValuationResponseById(@PathVariable Integer id) {
        return ResponseEntity.ok(responseValuationRequestService.getValuationResponse(id));
    }

    @PostMapping("/confirm-final-valuation-by-member")
    public ResponseEntity<ResponseRequestValuationDTO> confirmFinalValuation(@RequestParam("id") Integer id,//response id
                                                                            @RequestParam("status") Boolean status ) { // status response

        return ResponseEntity.ok(responseValuationRequestService.confirmFinalValuationByMember(id,status));
    }
}
