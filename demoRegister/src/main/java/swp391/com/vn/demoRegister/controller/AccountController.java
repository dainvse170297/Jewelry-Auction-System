package swp391.com.vn.demoRegister.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import swp391.com.vn.demoRegister.service.IAccountService;

@RestController
@RequestMapping("/account")
public class AccountController {
    private IAccountService accountService;

    @Autowired
    public AccountController(IAccountService iAccountService){
        this.accountService = iAccountService;
    }
    @PostMapping("/register")
    public String registerAccount(@RequestParam String username,
                                  @RequestParam String password,
                                  @RequestParam String confirmPassword){
        return accountService.registerAccount(username,password,confirmPassword);
    }

}
