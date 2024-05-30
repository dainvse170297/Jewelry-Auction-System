package com.fpt.edu.repository;

import com.fpt.edu.pojo.ValuationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IValuationRequestRepository extends JpaRepository<ValuationRequest, Integer> {
}
