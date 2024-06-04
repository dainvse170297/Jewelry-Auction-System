package com.fpt.edu.service;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.enums.LotStatus;
import com.fpt.edu.mapper.LotM;
import com.fpt.edu.repository.LotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ViewReadyLotService implements IViewReadyLotService{
    @Autowired
    private LotRepository lotRepository;

    public List<LotDTO> listLotStatusREADY(LotStatus status) {
        List<LotDTO> LotDTOList = new ArrayList<>();
        List<Lot> LotList = lotRepository.findByStatus(status);
        for (Lot lot : LotList) {
            LotDTOList.add(LotM.mapToDTO(lot));
            return LotDTOList;
        }
        return List.of();
    }
}
