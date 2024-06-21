package com.fpt.edu.controller;

import com.fpt.edu.dto.PaymentDTO;
import com.fpt.edu.entity.AuctionRegister;
import com.fpt.edu.security.response.ResponseObject;
import com.fpt.edu.service.IAuctionRegisterService;
import com.fpt.edu.service.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final VNPayService vnPayService;
    private final IAuctionRegisterService auctionRegisterService;

    @GetMapping("/vnpay")
    public ResponseObject<PaymentDTO.VNPayResponse> pay(HttpServletRequest request){
        return new ResponseObject<>(HttpStatus.OK, "Success", vnPayService.createVNPayPayment(request));
    }

    @GetMapping("/callback")
    public ResponseObject<PaymentDTO.VNPayResponse> payCallbackHandler(HttpServletRequest request,
                                                                       HttpServletResponse response,
                                                                       @RequestParam("vnp_ResponseCode") String vnp_ResponseCode,
                                                                       @RequestParam("auctionRegisterIds") List<Integer> auctionRegisterIds){
        String status = request.getParameter("vnp_ResponseCode");
        //get params from vnpay
        //resonse.sendRidirect("link front end")
        if(status.equals("00")){
            auctionRegisterService.processAuctionRegisterAfterPayment(auctionRegisterIds);
            return new ResponseObject<>(HttpStatus.OK, "Success", PaymentDTO.VNPayResponse.builder()
                    .code("00")
                    .message("Success")
                    .build());
        }else{
            return new ResponseObject<>(HttpStatus.OK, "Failed", PaymentDTO.VNPayResponse.builder()
                    .code("99")
                    .message("Failed")
                    .build());
        }
    }
}
