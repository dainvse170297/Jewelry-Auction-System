package com.fpt.edu.repository;

import com.fpt.edu.entity.Product;
import com.fpt.edu.entity.ProductImage;
import com.fpt.edu.entity.ValuationImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductImageRepository extends JpaRepository<ProductImage, Integer> {

     List<ProductImage> findByProduct (Product productId);

}
