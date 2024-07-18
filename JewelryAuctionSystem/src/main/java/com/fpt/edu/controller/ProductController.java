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
                                              @RequestParam("photos") MultipartFile[] photos,
                                              @RequestParam("buyNowPrice") BigDecimal buyNowPrice,
                                              @RequestParam("pricePerStep") BigDecimal pricePerStep,
                                              @RequestParam("maxStep") Integer maxStep,
                                              @RequestParam("startPrice") BigDecimal startPrice) throws IOException {
        Product product = productService.createProduct(valuationRequestId, categoryId, name, description, estimatePriceMax, estimatePriceMin, photos, buyNowPrice, pricePerStep, maxStep, startPrice);
        return ResponseEntity.ok(product);
    }
@PostMapping("/update-product")
    public ResponseEntity<Product> updateProduct( @RequestParam("productId") int productId,
                                                @RequestParam("valuationRequestId") int valuationRequestId,
                                              @RequestParam("categoryId") int categoryId,
                                              @RequestParam("name") String name,
                                              @RequestParam("description") String description,
                                              @RequestParam("estimatePriceMax") BigDecimal estimatePriceMax,
                                              @RequestParam("estimatePriceMin") BigDecimal estimatePriceMin,
                                              @RequestParam(value = "photos", required = false) MultipartFile[] photos,
                                              @RequestParam(value = "buyNowPrice", required = false) BigDecimal buyNowPrice,
                                              @RequestParam(value = "pricePerStep", required = false) BigDecimal pricePerStep,
                                              @RequestParam(value = "maxStep", required = false) Integer maxStep,
                                              @RequestParam(value = "startPrice", required = false) BigDecimal startPrice) throws IOException {
        Product product = productService.updateProduct(productId, valuationRequestId, categoryId, name, description, estimatePriceMax, estimatePriceMin, photos, buyNowPrice, pricePerStep, maxStep, startPrice);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/get-product-by-id")
    public ResponseEntity<Product> getProductById(@RequestParam("productId") int productId) {
        Product product = productService.getProductById(productId);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/get-all-product")
    public ResponseEntity<?> getAllProduct() {
        return ResponseEntity.ok(productService.getAllProduct());
    }

    @GetMapping("/delete-product")
    public ResponseEntity<?> deleteProduct(@RequestParam("productId") int productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.ok("Delete product successfully");
    }


}
