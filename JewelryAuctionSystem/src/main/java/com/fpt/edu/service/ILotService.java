package com.fpt.edu.service;

import com.fpt.edu.dto.LotDTO;
import org.springframework.stereotype.Service;


public interface ILotService {
  public  LotDTO createLot(LotDTO lotDTO);
}
