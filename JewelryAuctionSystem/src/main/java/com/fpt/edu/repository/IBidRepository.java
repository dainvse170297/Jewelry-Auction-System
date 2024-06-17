package com.fpt.edu.repository;

import com.fpt.edu.dto.BidDTO;
import com.fpt.edu.entity.Bid;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface IBidRepository  extends JpaRepository<Bid, Integer> {
     Bid findByMemberIdAndLotId(Integer memberId, Integer lotId);

     public List<Bid> findByLotIdOrderByTimeDesc(Integer lotId, Pageable pageable);
}
