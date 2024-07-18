package com.fpt.edu.repository;

import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.SellerPayment;
import com.fpt.edu.service.SellerPaymentService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ISellerPaymentRepository extends JpaRepository<SellerPayment, Integer> {

    List<SellerPayment> findByMemberId(Integer memberId);

    @Query("SELECT sp.member FROM SellerPayment sp WHERE sp.id = :sellerPaymentId")
    Member findMemberBySellerPaymentId(@Param("sellerPaymentId") int sellerPaymentId);

}
