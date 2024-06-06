package com.fpt.edu.repository;

import com.fpt.edu.entity.AuctionSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionSessionRepository extends JpaRepository<AuctionSession, Integer> {
}
