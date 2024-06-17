package com.fpt.edu.dto;

import com.fpt.edu.entity.ProductImage;
import com.fpt.edu.status.LotStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LotDTO {
        private Integer id;
        private Integer productId;
        private String productName; //descriptiion // time countdown
        private BigDecimal currentPrice;
        private String description;
        private LocalDateTime endTime;
        private LotStatus status;
        private List<ProductImage> productImages;
        private Integer numberOfRegister;
        private BigDecimal estimateMin;
        private BigDecimal estimateMax;
}
