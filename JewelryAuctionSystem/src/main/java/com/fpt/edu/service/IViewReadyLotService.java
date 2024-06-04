package com.fpt.edu.service;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.enums.LotStatus;

import java.util.List;

public interface IViewReadyLotService {
    public List<LotDTO> listLotStatusREADY(LotStatus status);
}
