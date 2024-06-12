package com.fpt.edu.service;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.mapper.LotMapper;
import com.fpt.edu.repository.IAuctionRegisterRepository;
import com.fpt.edu.repository.ILotRepository;
import com.fpt.edu.status.AuctionRegisterStatus;
import com.fpt.edu.status.LotStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LotService implements ILotService{

    private final ILotRepository lotRepository;
    private final LotMapper lotMapper;
    private final IAuctionRegisterRepository auctionRegisterRepository;
    @Override
    public List<Lot> getLotsByStatusReady() {
        return lotRepository.findByStatus(LotStatus.READY);
    }

    @Override
    public Lot getLotsByStatusReadyById(int id) {
        Lot theLot = lotRepository.findById(id).orElseThrow(() -> new RuntimeException("Lot not found"));
        return theLot;
    }
    @Override
    public LotDTO viewLiveLotDetail(Integer id) {
        AuctionRegisterStatus status = AuctionRegisterStatus.BID;
        Optional<Lot> lots = lotRepository.findById(id);
        if (lots.isPresent()) {
            Lot lot = lots.get();
            LotDTO lotDTO = lotMapper.toLotDTO(lot);
            lotDTO.setNumberOfRegister(auctionRegisterRepository.countByLotIdAndStatus(lot.getId(), status));
            return lotDTO;
        } else {
            return null;
        }

    }
}
