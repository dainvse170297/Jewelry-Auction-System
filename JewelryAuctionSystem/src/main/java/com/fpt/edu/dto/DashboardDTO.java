package com.fpt.edu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {
   private String year;
   private Long[] revenue = new Long[12];
   private Integer totalAuctionSession;
   private Integer totalAuctionLots;
   private Integer totalAuctionLotsSold;
    private Integer totalAuctionLotsPendingPayment;
    private List<Map<String,Integer>> getProfitByCategory;
}

