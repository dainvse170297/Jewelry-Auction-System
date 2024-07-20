package com.fpt.edu.controller;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.mapper.LotMapper;
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
    private final LotMapper lotMapper;

    @GetMapping("/ready-lot")
    public ResponseEntity<List<LotDTO>> getReadyLot() {
        return ResponseEntity.ok(lotMapper.toLotDTOS(lotService.getLotsByStatusReady()));
    }

    @GetMapping("/ready-lot/{id}")
    public ResponseEntity<LotDTO> getReadyLotById(@PathVariable int id) {
        return ResponseEntity.ok(lotMapper.toLotDTO(lotService.getLotsByStatusReadyById(id)));
    }
    @GetMapping("/view-live-lot-detail/{id}")
    public ResponseEntity<LotDTO> viewLiveLotDetail(@PathVariable Integer id) { //id lot
        return ResponseEntity.ok(lotService.viewLiveLotDetail(id));
    }
    @GetMapping("/view-upcoming-lot-detail/{id}")
    public ResponseEntity<Lot> viewLotDetailDTO(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(lotService.viewLotDetailById(id));
    }
    @GetMapping("/view-list-purchased-lot")
    public ResponseEntity<List<LotDTO>> getLotsByStatusOfAuctionRegister() {
        return ResponseEntity.ok(lotService.getLotsByWinnerPurchaseAuctionRegister());
    }
    @GetMapping("/view-list-delivered-lot")
    public ResponseEntity<List<LotDTO>> getLotsByDeliveredAuctionRegister() {
        return ResponseEntity.ok(lotService.getLotsByDeliveredAuctionRegister());
    }

    @GetMapping("/get-lots-by-session/{sessionId}")
    public ResponseEntity<List<LotDTO>> getLotsBySession(@PathVariable int sessionId) {
        return ResponseEntity.ok(lotMapper.toLotDTOS(lotService.getLotsBySession(sessionId)));
    }

    @GetMapping("/all-lots")
    public ResponseEntity<List<Lot>> getAllLots() {
        return ResponseEntity.ok(lotService.getAllLots());
    }

    @GetMapping("/{lotId}")
    public ResponseEntity<Lot> getAllLotById(@PathVariable Integer lotId) {
        return ResponseEntity.ok(lotService.viewLotDetailById(lotId));
    }

}
