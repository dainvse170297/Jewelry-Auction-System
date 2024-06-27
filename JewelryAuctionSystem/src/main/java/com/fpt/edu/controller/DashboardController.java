package com.fpt.edu.controller;

import com.fpt.edu.dto.DashboardDTO;
import com.fpt.edu.service.IDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final IDashboardService iDashboardService;

    @GetMapping("/data/{year}")
    public ResponseEntity<DashboardDTO> getData(@PathVariable int year) {
        return ResponseEntity.ok(iDashboardService.getRevenueEachMonthOfYear(year));
    }
//
//    @GetMapping("/revenue/{year}")
//    public ResponseEntity<Map<Integer,Long[]>> getRevenue(@PathVariable int year) {
//        return ResponseEntity.ok(iDashboardService.getRevenueEachMonth(year));
//    }
//
//
//
//    @GetMapping("/revenue-before-year")
//    public ResponseEntity<Long[]> getRevenueBeforeYear() {
//        return ResponseEntity.ok(iDashboardService.getRevenueEachMonthOfBeforeYear());
//    }
//    @GetMapping("/total-auction-session/{year}")
//    public ResponseEntity<Integer> getTotalAuctionSession(@PathVariable int year) {
//        return ResponseEntity.ok(iDashboardService.getTotalAuctionSession(year));
//    }
//
//    @GetMapping("/total-auction-lots/{year}")
//    public ResponseEntity<Integer> getTotalAuctionLots(@PathVariable int year) {
//        return ResponseEntity.ok(iDashboardService.getTotalAuctionLots(year));
//    }
//
//    @GetMapping("/total-auction-lots-sold/{year}")
//    public ResponseEntity<Integer> getTotalAuctionLotsSold(@PathVariable int year) {
//        return ResponseEntity.ok(iDashboardService.getTotalAuctionLotsSold(year));
//    }

}
