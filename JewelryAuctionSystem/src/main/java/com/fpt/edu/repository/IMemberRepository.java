package com.fpt.edu.repository;

import com.fpt.edu.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IMemberRepository extends JpaRepository<Member, Integer>{
}
