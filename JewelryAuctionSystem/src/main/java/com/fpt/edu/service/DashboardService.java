package com.fpt.edu.service;

import com.fpt.edu.dto.DashboardAccountDTO;
import com.fpt.edu.dto.DashboardDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.LotMapper;
import com.fpt.edu.repository.*;
import com.fpt.edu.status.AuctionRegisterStatus;
import com.fpt.edu.status.AuctionSessionStatus;
import com.fpt.edu.status.ValuationRequestStatus;
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
    private final IAccountRepository accountRepository;
    private final IValuationRequestRepository valuationRequestRepository;

    private List<AuctionSession> getListAuctionSession(int year) {
        LocalDateTime startDate = LocalDateTime.of(year, 1, 1, 0, 0);
        LocalDateTime endDate = LocalDateTime.of(year, 12, 31, 23, 59);

        return auctionSessionRepository
                .findByStatusAndDateRange(AuctionSessionStatus.PAST, startDate, endDate);
    }

    @Override
    public DashboardDTO getRevenueEachMonthOfYear(int year) {
        DashboardDTO dashboardDTO = new DashboardDTO();
        // lay danh sach auction session theo nam , tinh bang startingBid
        List<AuctionSession> auctionSessions = getListAuctionSession(year);
        Long[] revenues = new Long[12];
        Arrays.fill(revenues, 0L); // gan gia tri het cho 0
        int totalLotJoinToAuction = 0;
        int totalLotSold = 0;
        int totalLotPendingPayment = 0;
        int totalRevenue = 0;

        // tao 12 thang cho category
        Map<String, Integer>[] totalProfitByCategory = new HashMap[12];
        String[] jewelryTypes = {"Bracelets", "Earrings", "Necklaces", "Rings"};
        //fill gia tri
        for (int i = 0; i < 12; i++) {
            totalProfitByCategory[i] = new HashMap<>();
            for (String jewelryType : jewelryTypes) {
                totalProfitByCategory[i].put(jewelryType, 0);
            }
        }


        for (AuctionSession auctionSession : auctionSessions) {
            LocalDateTime auctionDate = auctionSession.getStartingBid(); //start
            int month = auctionDate.getMonthValue() - 1;

            List<Lot> lots = lotRepository.findByAuctionSession(auctionSession);
            totalLotJoinToAuction += lots.size();
            log.info("totalLotJoinToAuction: " + totalLotJoinToAuction);
            for (Lot lotItem : lots) {
                List<AuctionRegister> auctionRegisters = auctionRegisterRepository.findByLot(lotItem);

                for (AuctionRegister auctionRegister : auctionRegisters) {
                    if (auctionRegister.getStatus() == AuctionRegisterStatus.PAYMENT_SUCCESS) {
                        totalLotSold++;
                        log.info("totalLotSold: " + totalLotSold);
                        revenues[month] += auctionRegister.getFinalPrice().longValue();
                        totalRevenue += auctionRegister.getFinalPrice().intValue();
                        log.info("totalRevenue: " + totalRevenue);
                        int idCategory = auctionRegister.getLot().getProduct().getCategory().getId();

                        // Check  id nam trong range 1-4
                        if (idCategory >= 1 && idCategory <= 4) {
                            String jewelryType = jewelryTypes[idCategory - 1];
                            int currentProfit = totalProfitByCategory[month].get(jewelryType);
                            log.info("month: " + month);
                            int newProfit = currentProfit + auctionRegister.getFinalPrice().intValue();
                            totalProfitByCategory[month].put(jewelryType, newProfit);
                        } else {
                            throw new RuntimeException("Category not found");
                        }
                    }
                }
            }

            totalLotPendingPayment = totalLotJoinToAuction - totalLotSold;
        }

        dashboardDTO.setYear(String.valueOf(year));
        dashboardDTO.setRevenue(revenues);
        dashboardDTO.setTotalAuctionSession(auctionSessions.size());
        dashboardDTO.setTotalAuctionLots(totalLotJoinToAuction);
        dashboardDTO.setTotalAuctionLotsSold(totalLotSold);
        dashboardDTO.setTotalAuctionLotsPendingPayment(totalLotPendingPayment);
        dashboardDTO.setTotalRevenue(totalRevenue);
        dashboardDTO.setGetProfitByCategory(totalProfitByCategory);


        return dashboardDTO;
    }


    private List<ValuationRequest> getListValuationRequest(int year) {
        LocalDateTime startDate = LocalDateTime.of(year, 1, 1, 0, 0);
        LocalDateTime endDate = LocalDateTime.of(year, 12, 31, 23, 59);

        return valuationRequestRepository.findByTimeRequestBetween(startDate, endDate, ValuationRequestStatus.MEMBER_ACCEPTED);
    }
    private List<Account> getListAccount(int year) {
        LocalDateTime startDate = LocalDateTime.of(year, 1, 1, 0, 0);
        LocalDateTime endDate = LocalDateTime.of(year, 12, 31, 23, 59);

        return accountRepository.findByCreationDateBetween(startDate, endDate);
    }
    @Override
    public DashboardAccountDTO getAccountInfo(int year) {
        DashboardAccountDTO dashboardAccountDTO = new DashboardAccountDTO();
        List<Account> accounts = getListAccount(year);

        for (Account account : accounts) {
            LocalDateTime creationDate = account.getCreateDate();
            int month = creationDate.getMonthValue() - 1;

            dashboardAccountDTO.getTotalAccounts()[month]++;

            if (account.getRole().getId() == 1) {
                dashboardAccountDTO.getTotalCustomers()[month]++;
            } else if (account.getRole().getId() == 2) {
                dashboardAccountDTO.getTotalStaffs()[month]++;
            } else if (account.getRole().getId() == 3) {
                dashboardAccountDTO.getTotalManagers()[month]++;
            }
        }

        int[] totalCusParticipatedAuction = new int[12];
        Arrays.fill(totalCusParticipatedAuction, 0); // gan gia tri
        int[] totalParticipatedSelling = new int[12];
        Arrays.fill(totalParticipatedSelling, 0);



        List<ValuationRequest> valuationRequests =getListValuationRequest(year); // lay ra list theo year
        for (ValuationRequest valuationRequest : valuationRequests) {
            LocalDateTime valuationDate = valuationRequest.getTimeRequest();
            log.info("valuationDate: " + valuationDate);
            int month = valuationDate.getMonthValue() - 1;
            totalParticipatedSelling[month]++;
        }




        dashboardAccountDTO.setTotalParticipatedSelling(totalParticipatedSelling);
        dashboardAccountDTO.setYear(year);
        return dashboardAccountDTO;
    }

}
