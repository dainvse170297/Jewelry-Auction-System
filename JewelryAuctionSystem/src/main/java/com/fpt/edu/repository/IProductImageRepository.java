package com.fpt.edu.repository;

import com.fpt.edu.entity.Product;
import com.fpt.edu.entity.ProductImage;
import com.fpt.edu.entity.ValuationImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductImageRepository extends JpaRepository<ProductImage, Integer> {

     List<ProductImage> findByProduct (Product productId);

}
