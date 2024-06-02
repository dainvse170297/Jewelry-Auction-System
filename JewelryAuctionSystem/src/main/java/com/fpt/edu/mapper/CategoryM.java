package com.fpt.edu.mapper;

import com.fpt.edu.dto.CategoryDTO;
import com.fpt.edu.entity.Category;

public class CategoryM {
    public static Category mapToCategory(CategoryDTO categoryDTO) {
        return new Category(
          categoryDTO.getId(),
          categoryDTO.getName(),
          categoryDTO.getDescription()
        );
    }
    public static CategoryDTO mapCategoryToCategoryDTO(Category category) {
        return new CategoryDTO(
                category.getId(),
                category.getName(),
                category.getDescription()
        );
    }
}
