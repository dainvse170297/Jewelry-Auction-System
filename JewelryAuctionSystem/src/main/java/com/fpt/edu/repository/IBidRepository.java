package com.fpt.edu.repository;

import com.fpt.edu.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBidRepository  extends JpaRepository<Bid, Integer> {
     Bid findByMemberIdAndLotId(Integer memberId, Integer lotId);
}
