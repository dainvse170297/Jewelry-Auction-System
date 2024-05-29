package com.fpt.edu.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "valuation_image")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValuationImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int valuationImageId;
    private String imageUrl;
    private String defaultImage;
}
