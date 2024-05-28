package com.FPT.giahuy.Login.Register.mapper;

import com.FPT.giahuy.Login.Register.Entity.RoleEntity;
import com.FPT.giahuy.Login.Register.dto.RoleDTO;

public class RoleMap {
    public static RoleEntity mapToEntity(RoleDTO roleDTO) {
        return new RoleEntity(
                roleDTO.getRoleId(),
                roleDTO.getRoleName()
        );
    }

    public static RoleDTO mapToDTO(RoleEntity roleEntity) {

        return new RoleDTO(
                roleEntity.getRoleId(),
                roleEntity.getRoleName()
        );
    }
}
