package com.fpt.edu.service;


import com.fpt.edu.dto.BidDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.BidMapper;
import com.fpt.edu.repository.*;
import com.fpt.edu.status.AuctionRegisterStatus;
import com.fpt.edu.status.LotStatus;
import com.fpt.edu.status.NotifyType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor

public class BidService implements IBidService {

    private static final Logger log = LoggerFactory.getLogger(BidService.class);
    private final IMemberRepository iMemberRepository;
    private final ILotRepository iLotRepository;
    private final IBidRepository iBidRepository;
    private final BidMapper bidMapper;
    private final IAuctionRegisterRepository iAuctionRegisterRepository;
    private final IFinancialProofRequestRepository iFinancialProofRequestRepository;
    private final INotifyRepository iNotifyRepository;
    @Autowired
    WebSocketService webSocketService;


    private Bid createAndSaveBid(Integer memberId, Integer lotId, BigDecimal price) {
        Bid bid = new Bid();
        bid.setPrice(price);
        bid.setMember(iMemberRepository.findById(memberId).get());
        bid.setLot(iLotRepository.findById(lotId).get());
        bid.setTime(LocalDateTime.now());
        return iBidRepository.save(bid);
    }

    // @PostAuthorize("returnObject.username == authentication.name")
    //@PreAuthorize("hasAuthority('SCOPE_MEMBER')")
    @Override
    public ResponseEntity<BidDTO> placeForBid(Integer memberId, Integer lotId, BigDecimal price) {
        log.info("--- Start Place For Bid ---");
        Member member = iMemberRepository.findById(memberId).get();
        log.info("member id: {} ", member.getId());
        String memberName = member.getFullname();
        log.info("member name: {} ", member.getFullname());
        AuctionRegister auctionRegister = iAuctionRegisterRepository.findByLotIdAndMemberId(lotId, memberId);
        log.info("auction: {}", auctionRegister.getId());
        BigDecimal newFinancialProofAmount = member.getFinancialProofAmount();

        Lot lot = iLotRepository.findById(lotId).get();
        BigDecimal buyNowPrice = lot.getBuyNowPrice();
        //handle by now case
        if (buyNowPrice.compareTo(price) <= 0) {
            log.info("Price Buy Now: {}", buyNowPrice);
            if (lot.getStatus() == LotStatus.SOLD) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "This lot has been sold");
            }
            // update lot info
            lot.setCurrentPrice(buyNowPrice);
            lot.setCurrentWinnerId(memberId);
            lot.setStatus(LotStatus.SOLD);
            iLotRepository.save(lot);

            Bid bid = createAndSaveBid(memberId, lotId, buyNowPrice);

            //update auction register
            if (auctionRegister.getCurrentPrice() != null) {

                newFinancialProofAmount = member.getFinancialProofAmount()
                        .subtract(bid.getPrice().subtract(auctionRegister.getCurrentPrice()));
            } else {
                newFinancialProofAmount = member.getFinancialProofAmount().subtract(bid.getPrice());
            }
            auctionRegister.setCurrentPrice(buyNowPrice);
            auctionRegister.setFinalPrice(buyNowPrice);
            auctionRegister.setStatus(AuctionRegisterStatus.PENDING_PAYMENT);
            iAuctionRegisterRepository.save(auctionRegister);

            member.setFinancialProofAmount(newFinancialProofAmount);
            iMemberRepository.save(member);


            Notify notify = new Notify();
            notify.setMember(member);
            notify.setTitle("You have won the auction: " + lot.getProduct().getName());
            notify.setDescription("You have won the auction" + lot.getProduct().getName() + " with price $" + buyNowPrice);
            notify.setNotifiableId(lotId);
            notify.setNotifiableType(NotifyType.WINNER);
            notify.setDate(LocalDateTime.now());
            notify.setIsRead(false);
            iNotifyRepository.save(notify);

            //update everyone else financial prove amount
            List<AuctionRegister> auctionRegisters = iAuctionRegisterRepository.findByLotId(lotId);
            for (AuctionRegister auctionRegister1 : auctionRegisters) {
                if (auctionRegister1.getId() != auctionRegister.getId()) {
                    Member member1 = auctionRegister1.getMember();
                    if (member1.getFinancialProofAmount() != null && auctionRegister1.getCurrentPrice() != null) {
                        member1.setFinancialProofAmount(member1.getFinancialProofAmount().add(auctionRegister1.getCurrentPrice()));
                        iMemberRepository.save(member1);
                    }
                }
            }

            throw new ResponseStatusException(HttpStatus.OK, "You have won the auction with price " + buyNowPrice);
        }//end handle buy now case

        BigDecimal currentPrice = lot.getCurrentPrice() == null ? lot.getStartPrice() : lot.getCurrentPrice();

        if (currentPrice.compareTo(price) < 0) {
            log.info("Place Bid: {}", price);
            lot.setCurrentPrice(price);
            lot.setCurrentWinnerId(memberId);
            iLotRepository.save(lot);
            Bid bid = createAndSaveBid(memberId, lotId, price);


            if (auctionRegister.getCurrentPrice() != null) {
                newFinancialProofAmount = member.getFinancialProofAmount()
                        .subtract(bid.getPrice().subtract(auctionRegister.getCurrentPrice()));
            } else {
                newFinancialProofAmount = member.getFinancialProofAmount().subtract(bid.getPrice());
            }
            auctionRegister.setCurrentPrice(price);
            auctionRegister.setFinalPrice(price);
            iAuctionRegisterRepository.save(auctionRegister);
            member.setFinancialProofAmount(member.getFinancialProofAmount().subtract(bid.getPrice()));
            iMemberRepository.save(member);

            member.setFinancialProofAmount(newFinancialProofAmount);
            iMemberRepository.save(member);
            return ResponseEntity.ok(bidMapper.mapToBidDTO(bid, memberName));
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Your bid is lower than the current price");
    }


    @Override
    public List<BidDTO> getListBidByLotIdWithTimeDesc(Integer lotId) {
        Pageable topTen = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "time"));
        List<Bid> bids = iBidRepository.findByLotIdOrderByTimeDesc(lotId, topTen);
        List<BidDTO> bidDTOS = new ArrayList<>();
        for (Bid bid : bids) {
            BidDTO bidDTO = bidMapper.mapToBidDTO(bid, bid.getMember().getFullname());
            bidDTOS.add(bidDTO);
        }
        return bidDTOS;
    }

}
