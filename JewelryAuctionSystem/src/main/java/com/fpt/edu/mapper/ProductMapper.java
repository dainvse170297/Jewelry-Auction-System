package com.fpt.edu.mapper;

import com.fpt.edu.dto.ProductDTO;
import com.fpt.edu.entity.Product;

public class ProductMapper {
    public static ProductDTO mapToDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                ValuationRequestMapper.mapToValuationRequestDTO(product.getValuationRequest()),
                CategoryM.mapCategoryToCategoryDTO(product.getCategory()),
                product.getName(),
                product.getDescription(),
                product.getEstimatePriceMax(),
                product.getEstimatePriceMin()
        );
    }

    public static Product mapToEntity(ProductDTO productDTO) {
        return new Product(
                productDTO.getId(),
                ValuationRequestMapper.mapToValuationRequest(productDTO.getValuationRequestDTO()),
                CategoryM.mapToCategory(productDTO.getCategoryDTO()),
                productDTO.getName(),
                productDTO.getDescription(),
                productDTO.getEstimatePriceMax(),
                productDTO.getEstimatePriceMin()
        );
    }
}
