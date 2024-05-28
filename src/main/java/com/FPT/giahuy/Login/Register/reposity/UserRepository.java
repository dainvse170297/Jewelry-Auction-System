package com.FPT.giahuy.Login.Register.reposity;

import com.FPT.giahuy.Login.Register.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
}
