package com.FPT.giahuy.Login.Register.service;

import com.FPT.giahuy.Login.Register.Entity.UserEntity;
import com.FPT.giahuy.Login.Register.dto.MemberDTO;
import com.FPT.giahuy.Login.Register.dto.UserDTO;
import com.FPT.giahuy.Login.Register.mapper.UserMap;
import com.FPT.giahuy.Login.Register.reposity.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserDTO createUser(UserDTO userDTO) {
        UserEntity userEntity = UserMap.mapToEntity(userDTO);
        UserEntity createdUser = userRepository.save(userEntity);
        return UserMap.mapToDTO(createdUser);

    }

    public boolean login(MemberDTO memberDTO) {
        List<UserEntity> users = userRepository.findAll();
        List<UserDTO> userDTOs = new ArrayList<>();
        for (UserEntity user : users) {
            userDTOs.add(UserMap.mapToDTO(user));

        }
        for (UserDTO userDTO : userDTOs) {
            if (userDTO.getUsername().equals(memberDTO.getUsername()) && userDTO.getPassword().equals(memberDTO.getPassword())) {
                return true;
            }
        }
        return false;
    }

    public UserDTO changePassword(Integer id, UserDTO userDTO) {
        UserEntity userEntity = userRepository.findById(id).get();
        userEntity.setPassword(userDTO.getPassword());
        UserEntity changePassword = userRepository.save(userEntity);


        return UserMap.mapToDTO(changePassword);
    }
}
