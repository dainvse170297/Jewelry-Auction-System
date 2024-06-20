package com.fpt.edu.service;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.entity.AuctionRegister;
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
        if (lots.isEmpty()) {
            throw new RuntimeException("Lot not found");
        }
        Lot lot = lots.get();
        LotDTO lotDTO = lotMapper.toLotDTO(lot);
        lotDTO.setNumberOfRegister(auctionRegisterRepository.countByLotIdAndStatus(lot.getId(), status));
        return lotDTO;


    }
    public Lot viewLotDetailById(int id) {
        Lot lot = lotRepository.findById(id).orElseThrow(() -> new RuntimeException("Lot not found"));
        LotDTO lotDTO = lotMapper.toLotDTO(lot);
        return lot;
    }

    @Override
    public List<LotDTO> getLotsByWinnerPurchaseAuctionRegister() {
        AuctionRegisterStatus status = AuctionRegisterStatus.WINNER_PURCHASED;
          List<AuctionRegister> auctionRegisters =
                  auctionRegisterRepository.findByStatus(status);
          List<Lot> lots = auctionRegisters.stream().map(AuctionRegister::getLot).toList();
          
            List<LotDTO> lotDTOS = new ArrayList<>();
            for (Lot lot : lots) {
                if(lot.getStatus().equals(LotStatus.SOLD)){
                    LotDTO lotDTO = lotMapper.toLotDTO(lot);
                    lotDTO.setNumberOfRegister(auctionRegisterRepository.countByLotIdAndStatus(lot.getId(), status));
                    lotDTOS.add(lotDTO);
                }
            }
            return lotDTOS;
    }

    @Override
    public List<LotDTO> getLotsByDeliveredAuctionRegister() {
        AuctionRegisterStatus status = AuctionRegisterStatus.DELIVERED;
        List<AuctionRegister> auctionRegisters =
                auctionRegisterRepository.findByStatus(status);
        List<Lot> lots = auctionRegisters.stream().map(AuctionRegister::getLot).toList();

        List<LotDTO> lotDTOS = new ArrayList<>();
        for (Lot lot : lots) {
            if(lot.getStatus().equals(LotStatus.SOLD)){
                LotDTO lotDTO = lotMapper.toLotDTO(lot);
                lotDTO.setNumberOfRegister(auctionRegisterRepository.countByLotIdAndStatus(lot.getId(), status));
                lotDTOS.add(lotDTO);
            }
        }
        return lotDTOS;
    }
}
