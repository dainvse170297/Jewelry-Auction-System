package com.fpt.edu.dto;

import com.fpt.edu.status.AuctionSessionStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionSessionDTO {
    private Integer id;
    private Integer staffId;
    private LocalDateTime startingBid;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String name;
    private String description;
    private AuctionSessionStatus status;
    private String defaultImageURL;
}
