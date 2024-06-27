package com.fpt.edu.entity;

import com.fpt.edu.status.AuctionSessionStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "auction_session")
public class AuctionSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auction_session_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "staff_id", nullable = true)
    private Staff staff;

    @Column(name = "starting_bid")
    private LocalDateTime startingBid;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "description")
    private String description;

    private String image;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private AuctionSessionStatus status;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "auctionSession")
    private Set<Lot> lots = new LinkedHashSet<>();

}