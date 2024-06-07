package com.fpt.edu.mapper;

import com.fpt.edu.dto.RoleDTO;
import com.fpt.edu.entity.Role;

public class RoleM {
    public static RoleDTO mapToDTO (Role role){
        return new RoleDTO(
                role.getId(),
                role.getName(),
                role.getDescription()
        );
    }
    public static Role mapToEntity (RoleDTO roleDTO){
        return new Role(
                roleDTO.getId(),
                roleDTO.getName(),
                roleDTO.getDescription()
        );
    }
}
