package com.fpt.edu.dto;

import com.fpt.edu.entity.Staff;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class AuctionSessionDTO {
    private Integer id;
    private StaffDTO staffDTO;
    private int  startingBid;
    private LocalDate startTime;
    private LocalDate endTime;
    private String name;
    private String description;
    private String status;




}