package com.fpt.edu.dto;

import com.fpt.edu.status.AuctionSessionStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ViewLiveAuctionSessionDetailDTO {

    private int id;
    private int staffId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
   // private LocalDateTime countdownTime;
    
    private String name;
    private String description;
    private AuctionSessionStatus status;
    private Set<LotDTO> lots;


}
