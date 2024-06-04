package com.fpt.edu.entity;

import com.fpt.edu.enums.AuctionSessionStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "auction_session")
public class AuctionSession {
    //done
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auction_session_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "staff_id", nullable = false)
    private Staff staff;

    @Column(name = "starting_bid")
    private int startingBid;

    @Column(name = "start_time")
    private LocalDate startTime;

    @Column(name = "end_time")
    private LocalDate endTime;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private AuctionSessionStatus status;


    @OneToMany(mappedBy = "auctionSession")
    private Set<Lot> lots = new LinkedHashSet<>();

    public AuctionSession(Integer id, Staff staff, int startingBid, LocalDate startTime, LocalDate endTime, String name, String description, AuctionSessionStatus status) {
        this.id = id;
        this.staff = staff;
        this.startingBid = startingBid;
        this.startTime = startTime;
        this.endTime = endTime;
        this.name = name;
        this.description = description;
        this.status = status;
    }
}