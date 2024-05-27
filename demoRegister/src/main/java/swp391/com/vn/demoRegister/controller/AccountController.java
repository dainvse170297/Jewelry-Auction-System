package swp391.com.vn.demoRegister.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import swp391.com.vn.demoRegister.service.IAccountService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/account")
public class AccountController {
    private IAccountService accountService;

    @Autowired
    public AccountController(IAccountService iAccountService)
    {
        this.accountService = iAccountService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerAccount(@RequestParam("username") String username,
                                                               @RequestParam("password") String password,
                                                               @RequestParam("confirmPassword") String confirmPassword) {
        String message = accountService.registerAccount(username, password, confirmPassword);
        Map<String, Object> response = new HashMap<>();
        if ("Register Sucessful".equals(message)) {
            response.put("message", message);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("error", message);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

}
