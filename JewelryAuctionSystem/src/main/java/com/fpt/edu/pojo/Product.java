package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    @Column(length = 50)
    private String name;
    private String description;
    @Column(precision = 19,scale = 1)
    private BigDecimal estimatePriceMin;
    @Column(precision = 19,scale = 1)
    private BigDecimal estimatePriceMax;
}
