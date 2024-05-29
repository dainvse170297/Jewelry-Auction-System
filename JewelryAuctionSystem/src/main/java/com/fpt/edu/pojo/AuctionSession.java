package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "auction_session")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuctionSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int auctionSessionId;

    private Date startingBid;
    private Date startTime;
    private Date endTime;
    @Column(length = 50)
    private String name;
    private String desciption;
    // còn status

}
