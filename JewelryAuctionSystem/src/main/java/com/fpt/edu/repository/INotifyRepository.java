package com.fpt.edu.repository;

import com.fpt.edu.entity.Notify;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface INotifyRepository extends JpaRepository<Notify, Integer> {


}
