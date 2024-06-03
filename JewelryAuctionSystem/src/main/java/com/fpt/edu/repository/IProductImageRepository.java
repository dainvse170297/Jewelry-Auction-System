package com.fpt.edu.repository;

import com.fpt.edu.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductImageRepository extends JpaRepository<ProductImage, Integer> {
}
