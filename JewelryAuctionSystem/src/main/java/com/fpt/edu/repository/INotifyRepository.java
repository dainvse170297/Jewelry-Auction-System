package com.fpt.edu.repository;

import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.Notify;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface INotifyRepository extends JpaRepository<Notify, Integer> {
    List<Notify> findByMemberId(Integer id);

    List<Notify> findByMember(Member member);
}
