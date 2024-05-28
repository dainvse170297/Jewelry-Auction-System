package com.FPT.giahuy.Login.Register.controller;

import com.FPT.giahuy.Login.Register.dto.RoleDTO;
import com.FPT.giahuy.Login.Register.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class RoleController {
    @Autowired
    private RoleService roleService;

    @PostMapping("/create")
    public RoleDTO createRole(@RequestBody RoleDTO roleDTO) {
        RoleDTO role = roleService.create(roleDTO);
        return role;
    }

}
