package com.fpt.edu.controller;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.service.ILotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/ready-lot/{id}")
    public ResponseEntity<Lot> getReadyLotById(@PathVariable int id) {
        return ResponseEntity.ok(lotService.getLotsByStatusReadyById(id));
    }
    @GetMapping("/view-live-lot-detail/{id}")
    public ResponseEntity<LotDTO> viewLiveLotDetail(@PathVariable Integer id) { //id lot
        return ResponseEntity.ok(lotService.viewLiveLotDetail(id));
    }
    @GetMapping("/lot-detail/{id}")
    public LotDTO viewLotDetailDTO(@PathVariable("id") Integer id) {
        return lotService.viewLiveLotDetail(id);
    }
}
