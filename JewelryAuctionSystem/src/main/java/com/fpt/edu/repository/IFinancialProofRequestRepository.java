package com.fpt.edu.repository;


import com.fpt.edu.entity.FinancialProofRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFinancialProofRequestRepository extends JpaRepository<FinancialProofRequest, Integer> {
}
