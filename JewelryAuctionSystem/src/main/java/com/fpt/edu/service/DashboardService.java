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
    private List<Account> getListAccount(int year) {
        LocalDateTime startDate = LocalDateTime.of(year, 1, 1, 0, 0);
        LocalDateTime endDate = LocalDateTime.of(year, 12, 31, 23, 59);

        return accountRepository.findByCreationDateBetween(startDate, endDate);
    }
    @Override
    public DashboardDTO getRevenueEachMonthOfYear(int year) {
        DashboardDTO dashboardDTO = new DashboardDTO();
        List<AuctionSession> auctionSessions = getListAuctionSession(year); // 1 3
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
            log.info("Month" + month);                                          // auction session id = 1 thi
            List<Lot> lots = lotRepository.findByAuctionSession(auctionSession);  // 1 2  3
            totalLotJoinToAuction += lots.size();

            log.info("Lot size" + lots.size());
            for (Lot lotItem : lots) {
                List<AuctionRegister> auctionRegisters = auctionRegisterRepository.findByLot(lotItem); // 4 5 6
                log.info("auction register" + auctionRegisters.size());
                for (AuctionRegister auctionRegister : auctionRegisters) {

                    if (auctionRegister.getStatus() == AuctionRegisterStatus.PENDING_PAYMENT) {
                        totalLotPendingPayment++;
                    }

                    if (auctionRegister.getStatus() == AuctionRegisterStatus.PAYMENT_SUCCESS) {
                        log.info("total sold in loop: " + totalLotSold);
                        totalLotSold++;
                        revenues[month] += auctionRegister.getFinalPrice().longValue();
                        log.info("log by month", revenues[month]);

                        HashMap<String, Integer> profitJewelry = new HashMap<>();
                        int idCategory = auctionRegister.getLot().getProduct().getCategory().getId();
                        log.info("id category: " + idCategory);
                        String[] jewelryTypes = {"Bracelets", "Earrings", "Necklaces", "Rings"};

                        // Check if idCategory is within the valid range
                        if (idCategory >= 1 && idCategory <= 4) {
                            // Set the profit for the corresponding jewelry type
                            profitJewelry.put(jewelryTypes[idCategory - 1], auctionRegister.getFinalPrice().intValue());

                            // Set the profit for the other jewelry types to 0
                            for (int i = 0; i < jewelryTypes.length; i++) {
                                if (i != idCategory - 1) {
                                    profitJewelry.put(jewelryTypes[i], 0);
                                }
                            }
                        } else {
                            throw new RuntimeException("Category not found");
                        }
                        profitByCategory.add(profitJewelry);

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
            dashboardDTO.setGetProfitByCategory(profitByCategory);
            log.info("TotalAuctionLotsPendingPayment : {}                    :", totalLotPendingPayment);
            for (int i = 0; i < revenues.length; i++) {
                log.info("Revenue of month {} in year {}: {}", i + 1, year, revenues[i]);
            }

        }
        return dashboardDTO;
    }




    @Override
    public DashboardAccountDTO getAccountInfo(int year) {
        DashboardAccountDTO dashboardAccountDTO = new DashboardAccountDTO();
        List<Account> accounts = getListAccount(year);

        int totalAccount = accounts.size();
        int totalCustomers = 0;
        int totalStaffs = 0;
        int totalManagers = 0;

        int totalCusParticipatedAuction = 0;
        int totalCusParticipatedSelling = 0;


        for (Account account : accounts) {
            if (account.getRole().getId() == 1) {
                totalCustomers++;
            } else if (account.getRole().getId() == 2) {
                totalStaffs++;
            } else if (account.getRole().getId() == 3) {
                totalManagers++;
            }

            if (account.getRole().getId() == 1) {
                List<AuctionRegister> auctionRegisters =
                        auctionRegisterRepository.findByMemberId(account.getMembers().getId());
               if(!auctionRegisters.isEmpty()){
                     totalCusParticipatedAuction ++;
               }
                List<ValuationRequest> valuationRequests =
                        valuationRequestRepository.findByValuationStatusAndMemberId
                                (ValuationRequestStatus.MEMBER_ACCEPTED,account.getMembers().getId());
               if(!valuationRequests.isEmpty()){
                   totalCusParticipatedSelling ++;
               }
            }


        }
        dashboardAccountDTO.setTotalAccounts(totalAccount);
        dashboardAccountDTO.setTotalCustomers(totalCustomers);
        dashboardAccountDTO.setTotalStaffs(totalStaffs);
        dashboardAccountDTO.setTotalManagers(totalManagers);
        dashboardAccountDTO.setTotalCusParticipatedAuction(totalCusParticipatedAuction);
        dashboardAccountDTO.setTotalCusParticipatedSelling(totalCusParticipatedSelling);



        return dashboardAccountDTO;
    }

}
