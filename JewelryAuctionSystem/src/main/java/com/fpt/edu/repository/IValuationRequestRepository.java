package com.fpt.edu.repository;

import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.status.ValuationRequestStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IValuationRequestRepository extends JpaRepository<ValuationRequest, Integer> {
    public List<ValuationRequest> findByValuationStatus(ValuationRequestStatus status);

    Page<ValuationRequest> findByValuationStatus(ValuationRequestStatus status, Pageable pageable);
    ValuationRequest findByIdAndValuationStatus(int id, ValuationRequestStatus status);

    ValuationRequest findByProductId(Integer productId);

    List<ValuationRequest> findByMemberId(Integer memberId);

    Page<ValuationRequest> findByMemberId(Integer memberId, Pageable pageable);
    Page<ValuationRequest> findAll(Pageable pageable);

    List<ValuationRequest> findByValuationStatusAndMemberId(ValuationRequestStatus status, Integer memberId);
}
