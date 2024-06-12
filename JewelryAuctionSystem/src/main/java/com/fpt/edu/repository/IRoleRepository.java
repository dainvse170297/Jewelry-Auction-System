package com.fpt.edu.repository;

import com.fpt.edu.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoleRepository extends JpaRepository<Role, Integer> {

    Role findByName(String name);
}
