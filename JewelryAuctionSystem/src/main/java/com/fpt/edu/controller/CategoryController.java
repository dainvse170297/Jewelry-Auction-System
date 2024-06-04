package com.fpt.edu.controller;

import com.fpt.edu.entity.Category;
import com.fpt.edu.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final ICategoryService iCategoryService;

    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAll() {

        return ResponseEntity.ok(iCategoryService.getAllCategories());
    }
}
