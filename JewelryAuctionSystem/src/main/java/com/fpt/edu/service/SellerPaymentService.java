package com.fpt.edu.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fpt.edu.entity.AuctionRegister;
import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.SellerPayment;
import com.fpt.edu.entity.SellerPaymentImg;
import com.fpt.edu.repository.IAuctionRegisterRepository;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.repository.ISellerPaymentImgRepository;
import com.fpt.edu.repository.ISellerPaymentRepository;
import com.fpt.edu.status.AuctionRegisterStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SellerPaymentService implements ISellerPaymentService{

    private final ISellerPaymentRepository sellerPaymentRepository;
    private final ISellerPaymentImgRepository sellerPaymentImgRepository;
    private final IMemberRepository memberRepository;
    private final IAuctionRegisterRepository auctionRegisterRepository;

    private final Cloudinary cloudinary;

    @Override
    public SellerPayment save(Integer memberId, Integer auctionRegisterId, BigDecimal transferAmount, MultipartFile[] imageUrls) throws IOException {
        SellerPayment sellerPayment = new SellerPayment();
        sellerPayment.setTransferAmount(transferAmount);
        Member thisMember = memberRepository.findById(memberId).get();
        sellerPayment.setMember(thisMember);
        sellerPayment.setPaymentDate(LocalDateTime.now());
        List<SellerPaymentImg> images = new ArrayList<>();

        for (MultipartFile image : imageUrls) {
            byte[] photo = image.getBytes();
            Map r = cloudinary.uploader().upload(photo, ObjectUtils.emptyMap());
            String url = (String) r.get("url");
            SellerPaymentImg sellerPaymentImg = new SellerPaymentImg();
            sellerPaymentImg.setImageUrl(url);
            sellerPaymentImg.setSellerPayment(sellerPayment);
            images.add(sellerPaymentImg);
        }

        sellerPayment.setSellerPaymentImgs(images);
        sellerPaymentRepository.save(sellerPayment);

        for (SellerPaymentImg sellerPaymentImg : images) {
            sellerPaymentImgRepository.save(sellerPaymentImg);
        }

        AuctionRegister auctionRegister = auctionRegisterRepository.findById(auctionRegisterId).get();
        auctionRegister.setStatus(AuctionRegisterStatus.PAYMENT_SUCCESS);
        auctionRegisterRepository.save(auctionRegister);


        return sellerPayment;
    }
}
