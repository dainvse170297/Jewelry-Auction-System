package com.fpt.edu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardAccountDTO {
    private int year;
    private int[] totalAccounts = new int[12];
    private int[] totalCustomers = new int[12];
    private int[] totalStaffs = new int[12];
    private int[] totalManagers = new int[12];
  //  private int[] totalCusParticipatedAuction = new int[12];
    private int[] totalParticipatedSelling = new int[12];


}
