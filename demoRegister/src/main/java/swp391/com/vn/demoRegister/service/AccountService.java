package swp391.com.vn.demoRegister.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.vn.demoRegister.pojo.Account;
import swp391.com.vn.demoRegister.pojo.Role;
import swp391.com.vn.demoRegister.repository.IAccountRepository;
import swp391.com.vn.demoRegister.repository.IRoleRepository;

import java.util.Date;
@Service
public class AccountService implements IAccountService{

    @Autowired
    private IAccountRepository accountRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Override
    public String registerAccount(String username, String password,
                                  String confirmPassword) {
        if (accountRepository.existsByUsername(username)) {
            return "Username already exists!";
        }
        if (!password.equals(confirmPassword)) {
            return "Password and Confirm Password do not match!";
        }
        Role role = roleRepository.findByName("USER");
        if(role == null){
            return "role not found!";
        }

        Account account = new Account();
        account.setUsername(username);
        account.setPassword(password);
        account.setCreated_date(new Date());
        // lưu ý insert cho role trước chứ không bị not found!
        //INSERT INTO role (name, description) VALUES ('USER', 'This is member');
        account.setRole(role);

        accountRepository.save(account);
        return "Register Sucessful";

    }
}
