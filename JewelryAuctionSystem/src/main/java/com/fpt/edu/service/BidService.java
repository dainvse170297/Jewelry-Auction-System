package com.fpt.edu.service;


import com.fpt.edu.dto.BidDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.BidMapper;
import com.fpt.edu.repository.*;
import com.fpt.edu.status.AuctionRegisterStatus;
import com.fpt.edu.status.LotStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
        Member member = iMemberRepository.findById(memberId).get();
        String memberName = member.getFullname();
        AuctionRegister auctionRegister = iAuctionRegisterRepository.findByLotIdAndMemberId(lotId, memberId);
        BigDecimal newFinancialProofAmount = member.getFinancialProofAmount();
        log.info("auction: {}", auctionRegister.getId());
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("Username: {}", authentication.getName());
        log.info("Role: {}", authentication.getAuthorities());

        Lot lot = iLotRepository.findById(lotId).get();
        BigDecimal byNowPrice = lot.getBuyNowPrice();
        //handle by now case
        if (byNowPrice.compareTo(price) <= 0) {

            if (lot.getStatus() == LotStatus.SOLD) {
                return ResponseEntity.badRequest().build();
            }

            log.info("Check buy now");

            // update lot info
            lot.setCurrentPrice(byNowPrice);
            lot.setCurrentWinnerId(memberId);
            lot.setStatus(LotStatus.SOLD);
            iLotRepository.save(lot);

            Bid bid = createAndSaveBid(memberId, lotId, byNowPrice);

            //update auction register
            if (auctionRegister != null) {
                newFinancialProofAmount = member.getFinancialProofAmount().subtract(bid.getPrice().subtract(auctionRegister.getCurrentPrice()));
                log.info("newFinancialProofAmount: {}", newFinancialProofAmount);
                auctionRegister.setCurrentPrice(byNowPrice);
                auctionRegister.setFinalPrice(byNowPrice);
                auctionRegister.setStatus(AuctionRegisterStatus.PENDING_PAYMENT);
                iAuctionRegisterRepository.save(auctionRegister);
            } else {
                newFinancialProofAmount = member.getFinancialProofAmount().subtract(bid.getPrice());
                log.info("newFinancialProofAmount: {}", newFinancialProofAmount);
            }
            iMemberRepository.save(member);
            return ResponseEntity.ok(bidMapper.mapToBidDTO(bid, memberName));
        }

        BigDecimal currentPrice = lot.getCurrentPrice() == null ? lot.getStartPrice() : lot.getCurrentPrice();

        if (currentPrice.compareTo(price) < 0) {

            lot.setCurrentPrice(price);
            lot.setCurrentWinnerId(memberId);
            iLotRepository.save(lot);
            Bid bid = createAndSaveBid(memberId, lotId, price);

            if (auctionRegister != null) {
                newFinancialProofAmount = member.getFinancialProofAmount().subtract(bid.getPrice().subtract(auctionRegister.getCurrentPrice()));
                log.info("newFinancialProofAmount: {}", newFinancialProofAmount);
                auctionRegister.setCurrentPrice(price);
                auctionRegister.setFinalPrice(price);
                iAuctionRegisterRepository.save(auctionRegister);
                member.setFinancialProofAmount(member.getFinancialProofAmount().subtract(bid.getPrice()));
                iMemberRepository.save(member);
            } else {
                newFinancialProofAmount = member.getFinancialProofAmount().subtract(bid.getPrice());
                log.info("newFinancialProofAmount: {}", newFinancialProofAmount);
            }
            member.setFinancialProofAmount(newFinancialProofAmount);
            iMemberRepository.save(member);
            return ResponseEntity.ok(bidMapper.mapToBidDTO(bid, memberName));
        }

        return ResponseEntity.badRequest().build();
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
