package com.fpt.edu.controller;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.service.LotService;
import com.fpt.edu.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Lot")

public class LotController {
    @Autowired
    private LotService lotService;
    @PostMapping("/createlot")
    public LotDTO createLot(@RequestBody LotDTO lot) {
       LotDTO newlot =lotService.createLot(lot);
        return newlot;
    }
}
