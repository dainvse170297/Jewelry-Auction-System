package com.fpt.edu.service;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.status.LotStatus;

import java.util.List;

public interface ILotService {
    public List<LotDTO> listLotStatusREADY(LotStatus status);
    public LotDTO createLot(int id,LotDTO lotDTO);
}
