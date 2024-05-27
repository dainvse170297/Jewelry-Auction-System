package swp391.com.vn.demoRegister.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import swp391.com.vn.demoRegister.pojo.Account;

public interface IAccountRepository extends JpaRepository<Account,Integer> {
    // tìm bởi username
    boolean existsByUsername(String username);
}
