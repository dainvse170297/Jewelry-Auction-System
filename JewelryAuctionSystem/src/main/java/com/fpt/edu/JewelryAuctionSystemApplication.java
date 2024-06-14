package com.fpt.edu;

import com.cloudinary.Cloudinary;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class JewelryAuctionSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(JewelryAuctionSystemApplication.class, args);
	}

}

