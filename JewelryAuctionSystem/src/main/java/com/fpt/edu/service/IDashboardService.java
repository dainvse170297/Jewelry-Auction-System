package com.fpt.edu.service;


import com.fpt.edu.dto.DashboardDTO;

import java.util.Map;

public interface IDashboardService {

    DashboardDTO getRevenueEachMonthOfYear(int year);
}
