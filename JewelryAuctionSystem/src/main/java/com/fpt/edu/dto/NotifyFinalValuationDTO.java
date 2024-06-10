package com.fpt.edu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotifyFinalValuationDTO {
    private Integer memberId;
    private String title;
    private String descriptionOfProduct;
    private LocalDateTime date;
    private boolean isRead;
}
