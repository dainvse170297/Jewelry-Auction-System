package com.fpt.edu.controller;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.enums.LotStatus;
import com.fpt.edu.service.ViewReadyLotService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/viewreadylot")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RestController
public class ViewReadyLot {

    @Autowired
    private ViewReadyLotService viewReadyLotService;

    @GetMapping("/listlotready")
    public List<LotDTO> viewReadyLot() {

        return viewReadyLotService.listLotStatusREADY(LotStatus.READY);
    }
}
