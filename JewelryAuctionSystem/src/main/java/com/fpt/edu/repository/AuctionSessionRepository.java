package com.fpt.edu.repository;

import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.enums.LotStatus;
import com.fpt.edu.enums.ValuationRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuctionSessionRepository  extends JpaRepository<AuctionSession,Integer> {
}
