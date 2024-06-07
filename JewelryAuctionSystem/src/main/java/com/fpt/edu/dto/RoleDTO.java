package com.fpt.edu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoleDTO {
    private Integer id;
    private String name;
    private String description;
}
