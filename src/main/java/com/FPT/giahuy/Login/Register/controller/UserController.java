package com.FPT.giahuy.Login.Register.controller;

import com.FPT.giahuy.Login.Register.dto.MemberDTO;
import com.FPT.giahuy.Login.Register.dto.UserDTO;
import com.FPT.giahuy.Login.Register.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/user")
    public UserDTO createUser(@RequestBody UserDTO userDTO) {
        UserDTO user = userService.createUser(userDTO);
        return user;
    }

    @PostMapping("/login")
    public boolean login(@RequestBody MemberDTO memberDTO) {
        boolean user = userService.login(memberDTO);
        if (user == true) {
            return true;
        }
        return false;
    }

    @PutMapping("/changepassword/{id}")
    public UserDTO updatePasswordUser(@PathVariable("id") int id, @RequestBody UserDTO userDTO) {
        UserDTO user = userService.changePassword(id, userDTO);
        return user;
    }
}
