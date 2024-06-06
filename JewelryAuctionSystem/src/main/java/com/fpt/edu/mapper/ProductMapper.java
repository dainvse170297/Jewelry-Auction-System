package com.fpt.edu.mapper;

import com.fpt.edu.dto.ProductDTO;
import com.fpt.edu.dto.ProductDetailDTO;
import com.fpt.edu.entity.Product;

import com.fpt.edu.entity.Lot;
import com.fpt.edu.entity.ProductImage;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.repository.ILotRepository;
import com.fpt.edu.repository.IProductImageRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ProductMapper {
    public ProductMapper() {
    }

    private ILotRepository iLotRepository;
    private IProductImageRepository iProductImageRepository;

    public ProductDTO toProductDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setCategoryId(product.getCategory().getId());
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setEstimatePriceMin(product.getEstimatePriceMin());
        productDTO.setEstimatePriceMax(product.getEstimatePriceMax());
        productDTO.setLots(product.getLots().stream().map(Lot::getId).collect(Collectors.toSet()));
        productDTO.setProductImages(product.getProductImages().stream().map(ProductImage::getId).collect(Collectors.toList()));
        return productDTO;
    }
    public Product toProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setId(productDTO.getId());
        product.setCategory(null);
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setEstimatePriceMin(productDTO.getEstimatePriceMin());
        product.setEstimatePriceMax(productDTO.getEstimatePriceMax());
        product.setLots((Set<Lot>) iLotRepository.findAllById(productDTO.getLots()));
        product.setProductImages(iProductImageRepository.findAllById(productDTO.getProductImages()));
        return product;
    }

    public ProductDetailDTO mapToProductDetailDTO(Product product, List<ProductImage> productImages, ValuationRequest valuationRequest) {
        return new ProductDetailDTO(
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
