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


}
