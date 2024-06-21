package com.fpt.edu.service;

import com.fpt.edu.config.VNPayConfig;
import com.fpt.edu.dto.PaymentDTO;
import com.fpt.edu.utils.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class VNPayService {

    private final VNPayConfig vnPayConfig;
    private final CurrencyService currencyService;
    private final IAuctionRegisterService auctionRegisterService;

    public PaymentDTO.VNPayResponse createVNPayPayment(HttpServletRequest request){
        try {
            long amount = (long) (Integer.parseInt(request.getParameter("amount"))*100L * Math.ceil(currencyService.getExchangeRate()));
            String bankCode = request.getParameter("bankCode");
            Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
            vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
            if(bankCode != null && !bankCode.isEmpty()){
                vnpParamsMap.put("vnp_BankCode", bankCode);
            }
            vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));

            String queryUrl = VNPayUtil.getPaymentUrl(vnpParamsMap, true);
            String hashData = VNPayUtil.getPaymentUrl(vnpParamsMap, false);

            String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
            queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
            String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;
//
//        for (int id: auctionRegisterIds){
//            System.out.println(id);
//        }



            return PaymentDTO.VNPayResponse.builder()
                    .code("OK")
                    .message("Success")
                    .paymentUrl(paymentUrl)
                    .build();

        }catch (Exception e) {
            return PaymentDTO.VNPayResponse.builder()
                    .code("ERROR")
                    .message("Error")
                    .build();
        }
    }

}
