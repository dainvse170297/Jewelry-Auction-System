package com.fpt.edu.repository;

import com.fpt.edu.entity.ValuationImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IValuationImageRepository extends JpaRepository<ValuationImage, Integer> {
}
