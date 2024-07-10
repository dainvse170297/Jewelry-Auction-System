package com.fpt.edu.service;

import com.fpt.edu.dto.DashboardDTO;
import com.fpt.edu.entity.AuctionRegister;
import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.mapper.LotMapper;
import com.fpt.edu.repository.IAuctionRegisterRepository;
import com.fpt.edu.repository.IAuctionSessionRepository;
import com.fpt.edu.repository.ILotRepository;
import com.fpt.edu.status.AuctionRegisterStatus;
import com.fpt.edu.status.AuctionSessionStatus;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DashboardService implements IDashboardService {

    private static final Logger log = LoggerFactory.getLogger(DashboardService.class);
    private final IAuctionSessionRepository auctionSessionRepository;
    private final ILotRepository lotRepository;
    private final IAuctionRegisterRepository auctionRegisterRepository;

    private List<AuctionSession> getListAuctionSession(int year) {
        LocalDateTime startDate = LocalDateTime.of(year, 1, 1, 0, 0);
        LocalDateTime endDate = LocalDateTime.of(year, 12, 31, 23, 59);

        return auctionSessionRepository
                .findByStatusAndDateRange(AuctionSessionStatus.PAST, startDate, endDate);
    }

    @Override
    public DashboardDTO getRevenueEachMonthOfYear(int year) {
        DashboardDTO dashboardDTO = new DashboardDTO();
        List<AuctionSession> auctionSessions = getListAuctionSession(year);
        // get total number of lot join in auction session past
        Long[] revenues = new Long[12];
        Arrays.fill(revenues, 0L); // Initialize all elements to 0
        int totalLotJoinToAuction = 0;
        int totalLotSold = 0;
        int totalLotPendingPayment = 0;
        List<Map<String, Integer>> profitByCategory = new ArrayList<>();

        for (AuctionSession auctionSession : auctionSessions) {
            LocalDateTime auctionDate = auctionSession.getStartingBid();
            log.info("Start bid: " + auctionDate);
            int month = auctionDate.getMonthValue() - 1; // MonthValue is 1-based, so adjust to 0-based index
            log.info("Month" + month);
            List<Lot> lots = lotRepository.findByAuctionSession(auctionSession);
            totalLotJoinToAuction += lots.size();

            log.info("Lot size" + lots.size());
            for (Lot lotItem : lots) {
                List<AuctionRegister> auctionRegisters = auctionRegisterRepository.findByLot(lotItem);
                log.info("auction register" + auctionRegisters.size());
                for (AuctionRegister auctionRegister : auctionRegisters) {

                    if(auctionRegister.getStatus() == AuctionRegisterStatus.PENDING_PAYMENT){
                        totalLotPendingPayment++;
                    }

                    if (auctionRegister.getStatus() == AuctionRegisterStatus.PAYMENT_SUCCESS) {
                        log.info("total sold in loop: " + totalLotSold);
                        totalLotSold++;
                        revenues[month] += auctionRegister.getFinalPrice().longValue();
                        log.info("log by month", revenues[month]);

                    }
                }
            }
        }
        log.info("Total lot join to auction session: {}            :", totalLotJoinToAuction);
        log.info("Total lot sold: {}                    :", totalLotSold);
        dashboardDTO.setYear(String.valueOf(year));
        dashboardDTO.setRevenue(revenues);
        dashboardDTO.setTotalAuctionSession(auctionSessions.size());
        dashboardDTO.setTotalAuctionLots(totalLotJoinToAuction);
        dashboardDTO.setTotalAuctionLotsSold(totalLotSold);
        dashboardDTO.setTotalAuctionLotsPendingPayment(totalLotPendingPayment);
        log.info("TotalAuctionLotsPendingPayment : {}                    :", totalLotPendingPayment);
        for (int i = 0; i < revenues.length; i++) {
            log.info("Revenue of month {} in year {}: {}", i + 1, year, revenues[i]);
        }
        return dashboardDTO;
    }


}
