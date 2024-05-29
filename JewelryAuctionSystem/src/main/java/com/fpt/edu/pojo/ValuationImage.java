package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "valuation_image")
public class ValuationImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "request_id", nullable = false)
    private ValuationRequest request;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "default_image")
    private String defaultImage;

}