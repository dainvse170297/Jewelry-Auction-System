package com.fpt.edu.dto;

import com.fpt.edu.status.NotifyType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotifyDTO {
    private int id;
    private Integer memberId;
    private String title;
    private String description;
    private Boolean isRead;
    private Integer notifiableId;
    private NotifyType notifiableType;
}
