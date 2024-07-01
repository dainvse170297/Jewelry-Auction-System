package com.fpt.edu.service;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.dto.PaymentInfoDTO;
import com.fpt.edu.entity.AuctionRegister;
import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.entity.PaymentInfo;
import com.fpt.edu.mapper.LotMapper;
import com.fpt.edu.repository.*;
import com.fpt.edu.status.AuctionRegisterStatus;
import com.fpt.edu.status.AuctionSessionStatus;
import com.fpt.edu.status.LotStatus;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.fpt.edu.mapper.PaymentInfoMapper.toPaymentInfoDTO;

@Service
@RequiredArgsConstructor
public class LotService implements ILotService{

    private static final Logger log = LoggerFactory.getLogger(LotService.class);
    private final ILotRepository lotRepository;
    private final LotMapper lotMapper;
    private final IAuctionRegisterRepository auctionRegisterRepository;
    private final IMemberRepository iMemberRepository;
    private final IPaymentInfoRepository paymentInfoRepository;
    private final IAuctionSessionRepository auctionSessionRepository;
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
                    lotDTO.setCurrentWinnerName(iMemberRepository.findById(lot.getCurrentWinnerId()).get().getFullname());
                    lotDTO.setAuctionRegistersId(auctionRegisterRepository.findByLotIdAndStatus(lot.getId(),status).getId());
                    PaymentInfo paymentInfo =paymentInfoRepository.findByAuctionRegisterId(auctionRegisterRepository.findByLotIdAndStatus(lot.getId(),status).getId());
                    lotDTO.setPaymentInfoDTO(toPaymentInfoDTO(paymentInfo));
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
                lotDTO.setCurrentWinnerName(iMemberRepository.findById(lot.getCurrentWinnerId()).get().getFullname());
                lotDTO.setPaymentInfoDTO(toPaymentInfoDTO(paymentInfoRepository.
                        findByAuctionRegisterId(auctionRegisterRepository.
                                findByLotIdAndStatus(lot.getId(),status).getId())));
                lotDTO.setNumberOfRegister(auctionRegisterRepository.countByLotIdAndStatus(lot.getId(), status));
                lotDTOS.add(lotDTO);
            }
        }
        return lotDTOS;
    }



}
