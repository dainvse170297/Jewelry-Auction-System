package com.fpt.edu.repository;

import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.status.AuctionSessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IAuctionSessionRepository extends JpaRepository<AuctionSession, Integer> {

    List<AuctionSession> findByStatus(AuctionSessionStatus status);
}
