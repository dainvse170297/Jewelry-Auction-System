package com.fpt.edu.mapper;

import com.fpt.edu.dto.ProductDTO;
import com.fpt.edu.entity.Product;
import com.fpt.edu.entity.ProductImage;
import com.fpt.edu.entity.ValuationRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductMapper {

    public ProductDTO mapToProductDTO(Product product,  List<ProductImage> productImages, ValuationRequest valuationRequest) {
        return new ProductDTO(
                product.getId(),
                valuationRequest.getId(),
                product.getCategory().getName(),
                product.getName(),
                product.getDescription(),
                product.getEstimatePriceMin(),
                product.getEstimatePriceMax(),
                productImages
        );
    }
}
