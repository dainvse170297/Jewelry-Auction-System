package com.fpt.edu.controller;

import com.fpt.edu.entity.Product;
import com.fpt.edu.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

@CrossOrigin("*")
@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final IProductService productService;


    //Test by postman done
    @PostMapping("/add-product")
    public ResponseEntity<Product> addProduct(@RequestParam("valuationRequestId") int valuationRequestId,
                                              @RequestParam("categoryId") int categoryId,
                                              @RequestParam("name") String name,
                                              @RequestParam("description") String description,
                                              @RequestParam("estimatePriceMax") BigDecimal estimatePriceMax,
                                              @RequestParam("estimatePriceMin") BigDecimal estimatePriceMin,
                                              @RequestParam("photos") MultipartFile[] photos) throws IOException {

        Product product = productService.createProduct(valuationRequestId,categoryId,name,description,estimatePriceMax,estimatePriceMin, photos);

        return ResponseEntity.ok(product);
    }



}
