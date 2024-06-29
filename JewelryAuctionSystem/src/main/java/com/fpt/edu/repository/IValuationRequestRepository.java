package com.fpt.edu.repository;

import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.status.ValuationRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IValuationRequestRepository extends JpaRepository<ValuationRequest, Integer> {
    public List<ValuationRequest> findByValuationStatus(ValuationRequestStatus status);

    ValuationRequest findByIdAndValuationStatus(int id, ValuationRequestStatus status);

    ValuationRequest findByProductId(Integer productId);

    List<ValuationRequest> findByMemberId(Integer memberId);

}
