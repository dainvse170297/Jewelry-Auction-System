package com.fpt.edu.service;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.entity.Lot;

import java.util.List;

public interface ILotService {

    List<Lot> getLotsByStatusReady();

    Lot getLotsByStatusReadyById(int id);

    LotDTO viewLiveLotDetail(Integer id);
    Lot viewLotDetailById(int id);

    List<LotDTO> getLotsByWinnerPurchaseAuctionRegister();

    List<LotDTO> getLotsByDeliveredAuctionRegister();
}
