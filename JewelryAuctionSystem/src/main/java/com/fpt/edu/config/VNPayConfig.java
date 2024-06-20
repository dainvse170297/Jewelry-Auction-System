package com.fpt.edu.config;

import com.fpt.edu.utils.VNPayUtil;
import lombok.Getter;
import org.springframework.context.annotation.Configuration;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

@Configuration
public class VNPayConfig {

    @Getter
    private String vnp_PayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    private String vnp_TmnCode = "EZP507AR";
    @Getter
    private String secretKey = "LZECX3PRZ6SZIVO34ZZEF0ZXYWUKPXUJ";
    private String vnp_ApiUrl = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";
    private String vnp_ReturnUrl = "http://localhost:5173/payment-callback";
    private String version = "2.1.0";
    private String command = "pay";
    private String vnp_OrderType = "other";

    public Map<String, String> getVNPayConfig(){
        Map<String, String> vnpParamsMap = new HashMap<>();

        vnpParamsMap.put("vnp_Version", version);
        vnpParamsMap.put("vnp_Command", command);
        vnpParamsMap.put("vnp_TmnCode", vnp_TmnCode);
        vnpParamsMap.put("vnp_CurrCode", "VND");
        vnpParamsMap.put("vnp_TxnRef", VNPayUtil.getRandomNumber(8));
        vnpParamsMap.put("vnp_OrderInfo", "Thanh Toan Don Hang " + VNPayUtil.getRandomNumber(8));
        vnpParamsMap.put("vnp_OrderType", vnp_OrderType);
        vnpParamsMap.put("vnp_Locale", "vn");
        vnpParamsMap.put("vnp_ReturnUrl", vnp_ReturnUrl);

        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(calendar.getTime());
        vnpParamsMap.put("vnp_CreateDate", vnp_CreateDate);
        calendar.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(calendar.getTime());
        vnpParamsMap.put("vnp_ExpireDate", vnp_ExpireDate);

        return vnpParamsMap;
    }
}
