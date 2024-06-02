package com.fpt.edu.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter

public class CategoryDTO {
    private int id;
    private String name;
    private String description;

    public CategoryDTO() {

    }

    public CategoryDTO(int id, String name, String description) {

        this.id = id;
        this.name = name;
        this.description = description;
    }
}
