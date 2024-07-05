package com.fpt.edu.repository;

import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.Notify;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface INotifyRepository extends JpaRepository<Notify, Integer> {
    List<Notify> findByMemberId(Integer id);

    List<Notify> findByMemberOrderByIdDesc(Member member);

    Optional<Notify> findById(Integer id);
}
