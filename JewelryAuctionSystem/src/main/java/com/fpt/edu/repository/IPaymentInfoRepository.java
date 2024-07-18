package com.fpt.edu.repository;

import com.fpt.edu.entity.PaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IPaymentInfoRepository extends JpaRepository<PaymentInfo, Integer> {
    PaymentInfo findByAuctionRegisterId(Integer auctionRegisterId);

    @Query("SELECT p FROM PaymentInfo p JOIN AuctionRegister ar ON p.auctionRegister.id = ar.id JOIN Lot l ON ar.lot.id = l.id WHERE l.currentWinnerId =:winnerId ")
    List<PaymentInfo> findByWinnerId(@Param("winnerId") Integer winnerId);
}
