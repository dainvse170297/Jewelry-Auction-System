package com.fpt.edu.mapper;

import com.fpt.edu.dto.ProductDTO1;
import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.Product;

public class ProductM {
    public static ProductDTO1 mapToDTO(Product product) {
        return new ProductDTO1(
                product.getId(),
                CategoryM.mapToDTO(product.getCategory()),
                product.getName(),
                product.getDescription(),
                product.getEstimatePriceMax(),
                product.getEstimatePriceMin()
        );
    }

    public static Product mapToEntity(ProductDTO1 productDTO1) {
        return new Product(
                productDTO1.getId(),
                CategoryM.mapToEntity(productDTO1.getCategoryDTO()),
                productDTO1.getName(),
                productDTO1.getDescription(),
                productDTO1.getEstimatePriceMax(),
                productDTO1.getEstimatePriceMin()
        );
    }


}
