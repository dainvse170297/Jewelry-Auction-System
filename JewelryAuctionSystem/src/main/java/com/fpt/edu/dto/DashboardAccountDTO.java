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
    private int totalAccounts;
    private int totalCustomers;
    private int totalStaffs;
    private int totalManagers;
    private int totalCusParticipatedAuction;
    private int totalCusParticipatedSelling;


}
