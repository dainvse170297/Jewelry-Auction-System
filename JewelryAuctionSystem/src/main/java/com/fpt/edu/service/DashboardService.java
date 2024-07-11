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
        List<AuctionSession> auctionSessions = getListAuctionSession(year);
        Long[] revenues = new Long[12];
        Arrays.fill(revenues, 0L); // Initialize all elements to 0
        int totalLotJoinToAuction = 0;
        int totalLotSold = 0;
        int totalLotPendingPayment = 0;
        int totalRevenue = 0;
        // Create a single map for profit by category
        Map<String, Integer> totalProfitByCategory = new HashMap<>();
        String[] jewelryTypes = {"Bracelets", "Earrings", "Necklaces", "Rings"};

        for (String jewelryType : jewelryTypes) {
            totalProfitByCategory.put(jewelryType, 0);
        }

        for (AuctionSession auctionSession : auctionSessions) {
            LocalDateTime auctionDate = auctionSession.getStartingBid();
            int month = auctionDate.getMonthValue() - 1;

            List<Lot> lots = lotRepository.findByAuctionSession(auctionSession);
            totalLotJoinToAuction += lots.size();

            for (Lot lotItem : lots) {
                List<AuctionRegister> auctionRegisters = auctionRegisterRepository.findByLot(lotItem);

                for (AuctionRegister auctionRegister : auctionRegisters) {
                    if (auctionRegister.getStatus() == AuctionRegisterStatus.PAYMENT_SUCCESS) {
                        totalLotSold++;
                        revenues[month] += auctionRegister.getFinalPrice().longValue();
                        totalRevenue += auctionRegister.getFinalPrice().intValue();
                        int idCategory = auctionRegister.getLot().getProduct().getCategory().getId();

                        // Check if idCategory is within the valid range
                        if (idCategory >= 1 && idCategory <= 4) {
                            String jewelryType = jewelryTypes[idCategory - 1];
                            int currentProfit = totalProfitByCategory.get(jewelryType);
                            int newProfit = currentProfit + auctionRegister.getFinalPrice().intValue();
                            totalProfitByCategory.put(jewelryType, newProfit);
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
        // Convert totalProfitByCategory map to a list of maps
        List<Map<String, Integer>> profitByCategory = new ArrayList<>();
        profitByCategory.add(totalProfitByCategory);
        dashboardDTO.setGetProfitByCategory(profitByCategory);

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
         dashboardAccountDTO.setYear(year);
        dashboardAccountDTO.setTotalAccounts(totalAccount);
        dashboardAccountDTO.setTotalCustomers(totalCustomers);
        dashboardAccountDTO.setTotalStaffs(totalStaffs);
        dashboardAccountDTO.setTotalManagers(totalManagers);
        dashboardAccountDTO.setTotalCusParticipatedAuction(totalCusParticipatedAuction);
        dashboardAccountDTO.setTotalCusParticipatedSelling(totalCusParticipatedSelling);



        return dashboardAccountDTO;
    }

}
