package com.fpt.edu.service;

import com.fpt.edu.dto.ProductDetailDTO;
import com.fpt.edu.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

public interface IProductService {

    Product createProduct(int valuationRequestId,
                          int categoryId,
                          String name,
                          String description,
                          BigDecimal estimatePriceMax,
                          BigDecimal estimatePriceMin,
                          MultipartFile[] photos,
                          BigDecimal buyNowPrice,
                          BigDecimal pricePerStep,
                          Integer maxStep,
                          BigDecimal startPrice) throws IOException;

    public ProductDetailDTO viewProductDetails(Integer productId);
}
