package com.fpt.edu.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "valuation_image")
public class ValuationImage {
    //done
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "request_id", nullable = false)
    private ValuationRequest request;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "image_id")
    private String imageId;
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "image_id", nullable = false)
//    private Integer id;
//
//    @ManyToOne(fetch = FetchType.EAGER, optional = false)
//    @JoinColumn(name = "request_id", nullable = false)
//    private ValuationRequest request;
//
//    @Column(name = "image_url")
//    private String imageUrl;
//
//    @Column(name = "default_image")
//    private String defaultImage;
}