package com.fpt.edu.service;


import com.fpt.edu.dto.DashboardDTO;

import java.util.Map;

public interface IDashboardService {
//    Map<Integer, Long[]> getRevenueEachMonth(int year);
//
//    Long[] getRevenueEachMonthOfBeforeYear();
//
//    int getTotalAuctionSession(int year);
//
//    int getTotalAuctionLots(int year);
//
//    int getTotalAuctionLotsSold(int year);
    DashboardDTO getRevenueEachMonthOfYear(int year);
}
