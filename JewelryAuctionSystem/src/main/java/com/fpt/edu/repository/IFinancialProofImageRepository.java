package com.fpt.edu.repository;

import com.fpt.edu.entity.FinancialProofImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFinancialProofImageRepository extends JpaRepository<FinancialProofImage, Integer> {
}
