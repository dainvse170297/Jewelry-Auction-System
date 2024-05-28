package swp391.com.vn.demoRegister.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import swp391.com.vn.demoRegister.pojo.Role;

public interface IRoleRepository extends JpaRepository<Role,Integer> {
    // tìm role bởi name
    Role findByName(String name);
}
