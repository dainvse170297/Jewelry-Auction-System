package com.fpt.edu.service;

import com.fpt.edu.dto.ProductDTO;
import com.fpt.edu.dto.ProductDTO1;
import com.fpt.edu.entity.Product;
import org.springframework.web.bind.annotation.RequestParam;
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
                          MultipartFile[] photos) throws IOException;

    public ProductDTO viewProductDetails(Integer productId);
    public ProductDTO1 createProduct(ProductDTO1 productDTO1);
}
