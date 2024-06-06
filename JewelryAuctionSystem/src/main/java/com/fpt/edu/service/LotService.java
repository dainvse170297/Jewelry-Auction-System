package com.fpt.edu.service;

import com.fpt.edu.entity.Lot;
import com.fpt.edu.repository.ILotRepository;
import com.fpt.edu.status.LotStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LotService implements ILotService{

    private final ILotRepository lotRepository;

    @Override
    public List<Lot> getLotsByStatusReady() {
        return lotRepository.findByStatus(LotStatus.READY);
    }

    @Override
    public Lot getLotsByStatusReadyById(int id) {
        Lot theLot = lotRepository.findById(id).orElseThrow(() -> new RuntimeException("Lot not found"));
        return theLot;
    }
}
