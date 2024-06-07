package com.fpt.edu.dto;

import com.fpt.edu.status.AuctionSessionStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionSessionDTO {
    private Integer id;
    private Integer staffId;
    private LocalDate startingBid;
    private LocalDate startTime;
    private LocalDate endTime;
    private String name;
    private String description;
    private AuctionSessionStatus status;
    private String defaultImageURL;
}
