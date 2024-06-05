package com.fpt.edu.repository;

import com.fpt.edu.entity.ResponseRequestValuation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IResponseRequestValuationRepository
        extends JpaRepository<ResponseRequestValuation, Integer> {

}
