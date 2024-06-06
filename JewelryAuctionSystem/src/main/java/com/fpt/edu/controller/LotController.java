package com.fpt.edu.controller;

import com.fpt.edu.entity.Lot;
import com.fpt.edu.service.ILotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/lot")
@RequiredArgsConstructor
public class LotController {

    private final ILotService lotService;

    @GetMapping("/ready-lot")
    public ResponseEntity<List<Lot>> getReadyLot() {
        return ResponseEntity.ok(lotService.getLotsByStatusReady());
    }
}
