package com.FPT.giahuy.Login.Register.service;

import com.FPT.giahuy.Login.Register.Entity.RoleEntity;
import com.FPT.giahuy.Login.Register.dto.RoleDTO;
import com.FPT.giahuy.Login.Register.mapper.RoleMap;
import com.FPT.giahuy.Login.Register.reposity.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public RoleDTO create(RoleDTO roleDTO) {
        RoleEntity roleEntity = RoleMap.mapToEntity(roleDTO);
        RoleEntity rolesave = roleRepository.save(roleEntity);
        return RoleMap.mapToDTO(rolesave);
    }

}
