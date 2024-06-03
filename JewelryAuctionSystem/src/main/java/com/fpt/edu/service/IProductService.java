package com.fpt.edu.service;

import com.fpt.edu.entity.Product;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;

public interface IProductService {

    Product createProduct(int valuationRequestId,
                          int categoryId,
                          String name,
                          String description,
                          BigDecimal estimatePriceMax,
                          BigDecimal estimatePriceMin);

}
