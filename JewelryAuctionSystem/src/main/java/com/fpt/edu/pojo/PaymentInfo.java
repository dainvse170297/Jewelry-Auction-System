package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "payment_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentInfoId;

    private String imageUrl;
    private Date createTime;
    @Column(precision = 19,scale = 1)
    private BigDecimal amount;
    // còn status



}
