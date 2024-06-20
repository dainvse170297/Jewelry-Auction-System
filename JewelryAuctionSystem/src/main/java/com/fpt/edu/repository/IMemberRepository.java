package com.fpt.edu.repository;

import com.fpt.edu.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IMemberRepository extends JpaRepository<Member, Integer>{
    Optional<Member> findByEmail(String email);


   // Member findByUsername(String username);
}
