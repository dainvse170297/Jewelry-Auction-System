package com.fpt.edu.entity;

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
    private LocalDate startingBid;

    @Column(name = "start_time")
    private LocalDate startTime;

    @Column(name = "end_time")
    private LocalDate endTime;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private Integer status;

    @OneToMany(mappedBy = "auctionSession")
    private Set<Lot> lots = new LinkedHashSet<>();

    public AuctionSession(Integer id, Staff staff, LocalDate startingBid, LocalDate startTime, LocalDate endTime, String name, String description, Integer status) {
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