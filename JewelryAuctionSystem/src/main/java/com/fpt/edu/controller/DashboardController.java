package com.fpt.edu.controller;

import com.fpt.edu.dto.DashboardAccountDTO;
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

    @GetMapping("/dataRevenue/{year}")
    public ResponseEntity<DashboardDTO> getData(@PathVariable int year) {
        return ResponseEntity.ok(iDashboardService.getRevenueEachMonthOfYear(year));
    }
    @GetMapping("/dataAccount/{year}")
    public ResponseEntity<DashboardAccountDTO> getDataAccount(@PathVariable int year) {
        return ResponseEntity.ok(iDashboardService.getAccountInfo(year));
    }


}
