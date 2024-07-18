package com.fpt.edu.service;

import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.SellerPayment;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

public interface ISellerPaymentService {

    SellerPayment save(Integer memberId, Integer auctionRegisterId, BigDecimal transferAmount, MultipartFile[] imageUrls) throws IOException;

    List<SellerPayment> getAllSellerPayment();

    SellerPayment getSellerPaymentById(Integer id);

    List<SellerPayment> getByMemberId(Integer memberId);

    Member getMemberBySellerPaymentId(int sellerPaymentId);
}
