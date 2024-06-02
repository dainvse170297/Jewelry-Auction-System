package com.fpt.edu.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Data


@Entity
@Table(name = "category")
public class Category {
    //done
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Integer id;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "category")
    private Set<Product> products = new LinkedHashSet<>();

    public Category(int id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;

    }
    public Category() {

    }
}