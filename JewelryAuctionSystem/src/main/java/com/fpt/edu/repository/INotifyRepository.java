package com.fpt.edu.repository;

import com.fpt.edu.entity.Notify;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
@Repository
public interface INotifyRepository extends JpaRepository<Notify, Integer> {
}
