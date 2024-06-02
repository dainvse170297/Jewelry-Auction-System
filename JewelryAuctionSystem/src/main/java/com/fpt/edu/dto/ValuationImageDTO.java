package com.fpt.edu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ValuationImageDTO {

    private Integer id;
    private int requestID;
    private String imageUrl;
    private String defaultImage;
}
