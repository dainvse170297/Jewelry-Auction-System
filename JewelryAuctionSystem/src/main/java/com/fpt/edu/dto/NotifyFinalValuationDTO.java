package com.fpt.edu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotifyFinalValuationDTO {
    private Integer memberId;
    private String title;
    private String descriptionOfProduct;
    private Date date;
    private boolean isRead;
}
