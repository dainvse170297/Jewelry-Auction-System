package com.fpt.edu.repository;

import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.enums.ValuationRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IValuationRequestRepository extends JpaRepository<ValuationRequest, Integer> {
    public List<ValuationRequest> findByValuationStatus(ValuationRequestStatus status);
}
