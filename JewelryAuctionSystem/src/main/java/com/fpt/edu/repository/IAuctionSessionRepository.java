package com.fpt.edu.repository;

import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.status.AuctionSessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface IAuctionSessionRepository extends JpaRepository<AuctionSession, Integer> {

    List<AuctionSession> findByStatus(AuctionSessionStatus status);


    @Query("SELECT a FROM AuctionSession a WHERE a.status = :status AND a.startingBid BETWEEN :startDate AND :endDate")
    List<AuctionSession> findByStatusAndDateRange(@Param("status") AuctionSessionStatus status,
                                                  @Param("startDate") LocalDateTime startDate,
                                                  @Param("endDate") LocalDateTime endDate);


}
