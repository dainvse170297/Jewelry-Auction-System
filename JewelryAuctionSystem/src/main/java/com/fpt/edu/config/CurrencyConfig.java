package com.fpt.edu.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestParam;

@Configuration
@ConfigurationProperties(prefix = "currency")
@Getter
@Setter
public class CurrencyConfig {
    private String apiUrl;
    private String apiKey;
}
