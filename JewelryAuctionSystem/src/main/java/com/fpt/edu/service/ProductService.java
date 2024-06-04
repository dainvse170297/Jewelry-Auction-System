package com.fpt.edu.service;

import com.fpt.edu.entity.Category;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.entity.Product;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.repository.CategoryRepository;
import com.fpt.edu.repository.IProductRepository;
import com.fpt.edu.repository.IValuationRequestRepository;
import com.fpt.edu.repository.LotRepository;
import com.fpt.edu.status.LotStatus;
import com.fpt.edu.status.ValuationRequestStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {

    private final IProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final LotRepository lotRepository;
    private final IValuationRequestRepository valuationRequestRepository;


    @Override
    public Product createProduct(int valuationRequestId, int categoryId, String name, String description, BigDecimal estimatePriceMax, BigDecimal estimatePriceMin) {

        Category category = categoryRepository.findById(categoryId).get();

        ValuationRequest valuationRequest = valuationRequestRepository.findById(valuationRequestId).get();
        valuationRequest.setValuationStatus(ValuationRequestStatus.PENDING_MANAGER_APPROVAL);


        Product product = new Product();
        product.setCategory(category);
        product.setDescription(description);
        product.setName(name);
        product.setEstimatePriceMax(estimatePriceMax);
        product.setEstimatePriceMin(estimatePriceMin);
        productRepository.save(product);

        valuationRequestRepository.save(valuationRequest);
        Lot lot = new Lot();
        lot.setProduct(product);
        lot.setStatus(LotStatus.WAITING);
        lot.setAuctionSession(null);
        lotRepository.save(lot);

        return product;
    }
}
