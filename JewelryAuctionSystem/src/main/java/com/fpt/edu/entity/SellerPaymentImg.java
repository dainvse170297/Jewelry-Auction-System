package com.fpt.edu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "seller_payment_images")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SellerPaymentImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String imageUrl;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "seller_payment_id")
    private SellerPayment sellerPayment;
}
