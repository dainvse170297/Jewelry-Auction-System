package com.fpt.edu.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fpt.edu.dto.ProductDTO;
import com.fpt.edu.dto.ProductDetailDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.ProductMapper;
import com.fpt.edu.repository.*;
import com.fpt.edu.status.LotStatus;
import com.fpt.edu.status.ValuationRequestStatus;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {

    private final IProductRepository productRepository;
    private final ICategoryRepository categoryRepository;
    private final ILotRepository lotRepository;
    private final IValuationRequestRepository valuationRequestRepository;
    private final IProductImageRepository productImageRepository;
    private final Cloudinary cloudinary;
    private final IProductRepository iProductRepository;
    private final IValuationRequestRepository iValuationRequestRepository;
    private final ProductMapper ProductMapper;

    @Override
    public Product createProduct(int valuationRequestId,
                                 int categoryId,
                                 String name,
                                 String description,
                                 BigDecimal estimatePriceMax,
                                 BigDecimal estimatePriceMin,
                                 MultipartFile[] photos,
                                 BigDecimal buyNowPrice,
                                 BigDecimal pricePerStep,
                                 Integer maxStep,
                                 BigDecimal startPrice) throws IOException {

        Category category = categoryRepository.findById(categoryId).get();

        ValuationRequest valuationRequest = valuationRequestRepository.findById(valuationRequestId).get();
        valuationRequest.setValuationStatus(ValuationRequestStatus.PENDING_MANAGER_APPROVAL);

        Product product = new Product();
        product.setCategory(category);
        product.setDescription(description);
        product.setName(name);
        product.setEstimatePriceMax(estimatePriceMax);
        product.setEstimatePriceMin(estimatePriceMin);

//        Set<ProductImage> images = new LinkedHashSet<>();
        List<ProductImage> images = new ArrayList<>();

        for (MultipartFile photoFile : photos) {
            byte[] photo = photoFile.getBytes();
            Map r = cloudinary.uploader().upload(photo, ObjectUtils.emptyMap());
            String url = (String) r.get("url");
            ProductImage image = new ProductImage();
            image.setImageUrl(url);
            image.setProduct(product);
            images.add(image);
        }
        product.setProductImages(images);
        productRepository.save(product);

        for(ProductImage image: images){
            productImageRepository.save(image);
        }

        valuationRequest.setProduct(product);
        valuationRequestRepository.save(valuationRequest);
        Lot lot = new Lot();
        lot.setProduct(product);
        lot.setStatus(LotStatus.WAITING);

        lot.setStartPrice(startPrice);
        lot.setBuyNowPrice(buyNowPrice);
        lot.setMaxStep(maxStep);
        lot.setPricePerStep(pricePerStep);
        lot.setAuctionSession(null);
        lotRepository.save(lot);

        return product;
    }
    @Override
    public ProductDetailDTO viewProductDetails(Integer productId) {
        Optional<Product> productOpt = iProductRepository.findById(productId);
        ValuationRequest valuationRequest = iValuationRequestRepository.findByProductId(productId);

        if (productOpt.isPresent()) {

            Product product = productOpt.get();

            List<ProductImage> productImages = productImageRepository.findByProduct(product);

            return ProductMapper.mapToProductDetailDTO(product, productImages, valuationRequest);
        } else {
            // Handle the case where no Product with the given id is found
            throw new EntityNotFoundException("No Product found with id: " + productId);
        }


    }
}
