package com.FPT.giahuy.Login.Register.mapper;

import com.FPT.giahuy.Login.Register.Entity.UserEntity;
import com.FPT.giahuy.Login.Register.dto.UserDTO;

public class UserMap {
    public static UserDTO mapToDTO(UserEntity userEntity) {
        return new UserDTO(
                userEntity.getId(),
                userEntity.getUsername(),
                userEntity.getPassword(),
                RoleMap.mapToDTO(userEntity.getRole())
        );
    }

    public static UserEntity mapToEntity(UserDTO userDTO) {
        return new UserEntity(
                userDTO.getId(),
                userDTO.getUsername(),
                userDTO.getPassword(),
                RoleMap.mapToEntity(userDTO.getRole())
        );
    }
}
