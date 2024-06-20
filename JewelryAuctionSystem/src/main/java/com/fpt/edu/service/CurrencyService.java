package com.fpt.edu.service;

import com.fpt.edu.config.CurrencyConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.DecimalFormat;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CurrencyService {

    private final CurrencyConfig currencyConfig;

    private RestTemplate restTemplate = new RestTemplate();
    private static final DecimalFormat df = new DecimalFormat("0");

    public double getExchangeRate(){
        String url = currencyConfig.getApiUrl() + "?access_key=" + currencyConfig.getApiKey();
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        Map<String, Double> rates = (Map<String, Double>) response.get("rates");

        return rates.get("VND");
    }

    public double convertUSDToVND(double amountInUSD){
        double exchangeRate = getExchangeRate();

        return amountInUSD * exchangeRate;
    }
}
