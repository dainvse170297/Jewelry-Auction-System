package com.fpt.edu.service;

import com.fpt.edu.dto.ProductDTO;
import com.fpt.edu.entity.Product;
import com.fpt.edu.mapper.ProductMapper;
import com.fpt.edu.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
    private final ProductRepository productRepository;

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product newProduct = ProductMapper.mapToProduct(productDTO);
        newProduct = productRepository.save(newProduct);
        return ProductMapper.mapToDTO(newProduct);
    }
}
