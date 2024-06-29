package com.fpt.edu.repository;


import com.fpt.edu.dto.FinancialProofRequestDTO;
import com.fpt.edu.entity.FinancialProofRequest;
import com.fpt.edu.entity.Member;
import com.fpt.edu.status.FinancialProofRequestStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface IFinancialProofRequestRepository extends JpaRepository<FinancialProofRequest, Integer> {

       @Query("SELECT DISTINCT fr FROM FinancialProofRequest fr JOIN FETCH fr.financialProofImages")
       List<FinancialProofRequest> findAllWithImages();


    @Query("SELECT DISTINCT fr FROM FinancialProofRequest fr JOIN FETCH fr.financialProofImages WHERE fr.id = :id")
    Optional<FinancialProofRequest> findByIdWithImages(Integer id);


    List<FinancialProofRequest> findByMember(Member member);

    List<FinancialProofRequest> findByStatus(FinancialProofRequestStatus status);

    FinancialProofRequest findByMemberAndStatus(Member member, FinancialProofRequestStatus status);

//    @Query("SELECT f FROM FinancialProofRequest f WHERE f.member = :member ORDER BY f.timeRequest DESC")
//    List<FinancialProofRequest> findLatestByMember(@Param("member") Member member, Pageable pageable);

}


