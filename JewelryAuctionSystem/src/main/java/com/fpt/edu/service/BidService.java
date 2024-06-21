package com.fpt.edu.service;


import com.fpt.edu.dto.BidDTO;
import com.fpt.edu.entity.AuctionRegister;
import com.fpt.edu.entity.Bid;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.mapper.BidMapper;
import com.fpt.edu.repository.IAuctionRegisterRepository;
import com.fpt.edu.repository.IBidRepository;
import com.fpt.edu.repository.ILotRepository;
import com.fpt.edu.repository.IMemberRepository;
import lombok.RequiredArgsConstructor;
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



    // cuoc doi la nhung chuyen di
    // va chuyen di dang nho nhat la mua he 2024
    // di SWP
    private Bid createAndSaveBid(Integer memberId, Integer lotId,BigDecimal price) {
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
        String memberName = iMemberRepository.findById(memberId).get().getFullname();

        AuctionRegister auctionRegister = iAuctionRegisterRepository.findByLotIdAndMemberId(lotId, memberId);
        //check log xem ai dang nhap
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("Username: {}", authentication.getName());
        log.info("Role: {}", authentication.getAuthorities());
        Lot lot = iLotRepository.findById(lotId).get();

            if(lot.getCurrentPrice().compareTo(price) < 0){
                lot.setCurrentPrice(price);
                lot.setCurrentWinnerId(memberId);
                iLotRepository.save(lot);
                Bid bid = createAndSaveBid( memberId, lotId,price);
                // update lại bảng Auction Register với mỗi lần bid của 1 member
                if (auctionRegister != null) {
                    auctionRegister.setCurrentPrice(price);
                    auctionRegister.setFinalPrice(price);
                    iAuctionRegisterRepository.save(auctionRegister);
                }
                return ResponseEntity.ok(bidMapper.mapToBidDTO(bid, memberName));
            }

        return ResponseEntity.badRequest().build();
    }


    @Override
    public List<BidDTO> getListBidByLotIdWithTimeDesc(Integer lotId) {
        Pageable topTen = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "time"));
        List<Bid> bids = iBidRepository.findByLotIdOrderByTimeDesc(lotId,topTen);
        List<BidDTO> bidDTOS = new ArrayList<>();
        for (Bid bid : bids) {
            BidDTO bidDTO = bidMapper.mapToBidDTO(bid, bid.getMember().getFullname());
            bidDTOS.add(bidDTO);
        }
        return bidDTOS;
    }

}
