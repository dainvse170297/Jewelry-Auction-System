package com.fpt.edu.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "cloudinary")
@Getter
@Setter
public class CloudinaryConfig {
    private String cloudName = "dhkmu458i";
    private String apiKey = "562518983843875";
    private String apiSecret = "h7RxZOm5lHsmQ5xkQI675-9sFMg";
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dhkmu458i",
                "api_key", "562518983843875",
                "api_secret", "h7RxZOm5lHsmQ5xkQI675-9sFMg"));
    }

}
