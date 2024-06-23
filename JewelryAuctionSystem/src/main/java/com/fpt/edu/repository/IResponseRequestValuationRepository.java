package com.fpt.edu.repository;

import com.fpt.edu.entity.ResponseRequestValuation;
import com.fpt.edu.entity.ValuationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface IResponseRequestValuationRepository extends JpaRepository<ResponseRequestValuation, Integer> {

    List<ResponseRequestValuation> findByValuationRequest(ValuationRequest valuationRequest);
}
