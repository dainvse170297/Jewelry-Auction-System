package com.fpt.edu.repository;

import com.fpt.edu.entity.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICreditCardRepository extends JpaRepository<CreditCard, Integer> {
}
