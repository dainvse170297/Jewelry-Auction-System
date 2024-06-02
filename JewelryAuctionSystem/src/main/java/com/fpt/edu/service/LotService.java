package com.fpt.edu.service;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.mapper.LotM;
import com.fpt.edu.repository.LotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class LotService implements ILotService {
    private final LotRepository lotRepository;
    @Override
    public LotDTO createLot(LotDTO lotDTO) {
        Lot lot = LotM.mapToLot(lotDTO);
        lot = lotRepository.save(lot);
        return LotM.mapToDTO(lot);
}
}
