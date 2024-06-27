    package com.fpt.edu.service;


    public interface IDashboardService {
        Long[] getRevenueEachMonthOfCurrentYear();
        Long[] getRevenueEachMonthOfBeforeYear();
         int getTotalAuctionSession(int year);
         int getTotalAuctionLots(int year);
         int getTotalAuctionLotsSold(int year);

    }
