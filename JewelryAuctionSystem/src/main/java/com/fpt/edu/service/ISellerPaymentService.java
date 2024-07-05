package com.fpt.edu.service;

import com.fpt.edu.entity.SellerPayment;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

public interface ISellerPaymentService {

    SellerPayment save(Integer memberId, Integer auctionRegisterId, BigDecimal transferAmount, MultipartFile[] imageUrls) throws IOException;
}
