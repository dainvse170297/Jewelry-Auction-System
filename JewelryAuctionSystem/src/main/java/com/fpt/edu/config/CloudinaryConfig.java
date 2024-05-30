package com.fpt.edu.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dhkmu458i",
                "api_key", "562518983843875",
                "api_secret", "h7RxZOm5lHsmQ5xkQI675-9sFMg"));
    }
}
