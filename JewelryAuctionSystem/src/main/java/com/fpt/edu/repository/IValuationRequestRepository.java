package com.fpt.edu.repository;

import com.fpt.edu.entity.ValuationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IValuationRequestRepository extends JpaRepository<ValuationRequest, Integer> {
}
