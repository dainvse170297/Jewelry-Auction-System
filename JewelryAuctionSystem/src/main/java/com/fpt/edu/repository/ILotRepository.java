package com.fpt.edu.repository;

import com.fpt.edu.entity.AuctionSession;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.status.LotStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ILotRepository extends JpaRepository<Lot, Integer> {

    List<Lot> findLotByProduct_Id(int productId);
    List<Lot> findByStatus(LotStatus lotStatus);
    List<Lot> findByAuctionSession(AuctionSession auctionSession);
    List<Lot> findByAuctionSession_Id(Integer auctionSessionId);
    List<Lot> findByAuctionSession_IdAndStatus(Integer auctionSessionId, LotStatus lotStatus);
}
