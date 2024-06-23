package com.fpt.edu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ValuationImageDTO {
    private int id;
    private int requestId;
    private String imageUrl;
    private String defaultImage;
}
