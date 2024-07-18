package com.fpt.edu.service;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.dto.PaymentInfoDTO;
import com.fpt.edu.entity.AuctionRegister;
import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.PaymentInfo;
import com.fpt.edu.mapper.LotMapper;
import com.fpt.edu.repository.*;
import com.fpt.edu.status.AuctionRegisterStatus;
import com.fpt.edu.status.LotStatus;
import com.fpt.edu.status.NotifyType;
import com.fpt.edu.utils.MessageProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.fpt.edu.mapper.PaymentInfoMapper.toPaymentInfoDTO;

@Service
@RequiredArgsConstructor
public class LotService implements ILotService {

    private static final Logger log = LoggerFactory.getLogger(LotService.class);
    private final ILotRepository lotRepository;
    private final LotMapper lotMapper;
    private final IAuctionRegisterRepository auctionRegisterRepository;
    private final IMemberRepository iMemberRepository;
    private final IPaymentInfoRepository paymentInfoRepository;
    private final IAuctionSessionRepository auctionSessionRepository;
    private final NotifyService notifyService;

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
        AuctionRegisterStatus status = AuctionRegisterStatus.REGISTERED;
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
        List<AuctionRegister> auctionRegisters = auctionRegisterRepository.findByStatus(status);


        List<Lot> lots = auctionRegisters.stream().map(AuctionRegister::getLot).toList();

        List<LotDTO> lotDTOS = new ArrayList<>();
        for (Lot lot : lots) {
            if (lot.getStatus().equals(LotStatus.SOLD)) {
                LotDTO lotDTO = lotMapper.toLotDTO(lot); //4523
                lotDTO.setNumberOfRegister(auctionRegisterRepository.countByLotIdAndStatus(lot.getId(), status));
                lotDTO.setCurrentWinnerName(iMemberRepository.findById(lot.getCurrentWinnerId()).get().getFullname());
                lotDTO.setAuctionRegistersId(auctionRegisterRepository.findByLotIdAndStatus(lot.getId(), status).getId());

                log.info("auctionRegisterId: " + auctionRegisterRepository.findByLotIdAndStatus(lot.getId(), status).getId());
                PaymentInfo paymentInfo = paymentInfoRepository.findByAuctionRegisterId(auctionRegisterRepository.findByLotIdAndStatus(lot.getId(), status).getId());
                log.info("paymentInfo: " + paymentInfo);
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
            if (lot.getStatus().equals(LotStatus.SOLD)) {
                LotDTO lotDTO = lotMapper.toLotDTO(lot);
                lotDTO.setCurrentWinnerName(iMemberRepository.findById(lot.getCurrentWinnerId()).get().getFullname());
                lotDTO.setAuctionRegistersId(auctionRegisterRepository.findByLotIdAndStatus(lot.getId(), status).getId());
                lotDTO.setPaymentInfoDTO(toPaymentInfoDTO(paymentInfoRepository.
                        findByAuctionRegisterId(auctionRegisterRepository.
                                findByLotIdAndStatus(lot.getId(), status).getId())));
                lotDTO.setNumberOfRegister(auctionRegisterRepository.countByLotIdAndStatus(lot.getId(), status));
                lotDTOS.add(lotDTO);
            }
        }
        return lotDTOS;
    }

    @Override
    public List<Lot> getLotsBySession(int sessionId) {
        AuctionSession auctionSession = auctionSessionRepository.findById(sessionId).get();
        List<Lot> lots = lotRepository.findByAuctionSession(auctionSession);
        return lots;
    }

    @Scheduled(fixedRate = 60 * 60 * 24 * 1000) //1 day
    public void updateLotStatus() {
        List<AuctionRegister> auctionRegisters = auctionRegisterRepository.findByStatus(AuctionRegisterStatus.PENDING_PAYMENT);
        for (AuctionRegister auctionRegister : auctionRegisters) {
            if (auctionRegister.getLot().getAuctionSession().getEndTime().plusDays(15).isBefore(java.time.LocalDateTime.now())) {
                Lot lot = auctionRegister.getLot();
                lot.setStatus(LotStatus.READY);
                lotRepository.save(lot);
                auctionRegister.setStatus(AuctionRegisterStatus.CANCELLED);
                auctionRegisterRepository.save(auctionRegister);
                //not paid lot, remind them to pay
                notifyService.insertNotify(auctionRegister.getMember(),
                        MessageProvider.PaymentService.timeoutWinnerPaymentTitle,
                        MessageProvider.PaymentService.timeoutWinnerPaymentDescription,
                        NotifyType.PAYMENT,
                        auctionRegister.getId()
                );
                Member member = auctionRegister.getMember();
                member.setFinancialProofAmount(new BigDecimal(-1));
                member.setFullname("Terminated Account!");
                iMemberRepository.save(member);
            } else if (auctionRegister.getLot().getAuctionSession().getEndTime().plusDays(14).isBefore(java.time.LocalDateTime.now())) {
                auctionRegisterRepository.save(auctionRegister);
                notifyService.insertNotify(auctionRegister.getMember(),
                        "Payment Reminder",
                        "You have an unpaid lot. Please make a payment as soon as possible. Your order is being cancel after 1 day.",
                        NotifyType.PAYMENT,
                        auctionRegister.getId()
                );
            } else if (auctionRegister.getLot().getAuctionSession().getEndTime().plusDays(7).isBefore(java.time.LocalDateTime.now())) {
                //not paid lot, remind them to pay
                notifyService.insertNotify(auctionRegister.getMember(),
                        "Payment Reminder",
                        "You have an unpaid lot. Please make a payment as soon as possible.",
                        NotifyType.PAYMENT,
                        auctionRegister.getId()
                );
            }
        }
    }
}
