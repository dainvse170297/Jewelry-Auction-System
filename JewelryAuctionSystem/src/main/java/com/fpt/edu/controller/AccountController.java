package com.fpt.edu.controller;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.entity.Account;
import com.fpt.edu.service.AccountService;
import com.fpt.edu.service.IAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

    private final IAccountService accountService;

    @GetMapping("/")
    public String getAccount() {
        return "Account";
    }

    @PostMapping("/member/register")
    public ResponseEntity<Account> createAccount(@RequestParam("username") String username,
                                                 @RequestParam("password")String password,
                                                 @RequestParam("fullName")String fullName,
                                                 @RequestParam("email")String email,
                                                 @RequestParam("phone")String phone,
                                                 @RequestParam("address")String address){

        return ResponseEntity.ok().body(accountService.createAccount(username,password,fullName,email,phone,address));
    }

    @GetMapping("id/{id}")
    public ResponseEntity<Map<String,Object>> getInformationById(@PathVariable("id") Integer id){
        return ResponseEntity.ok().body(accountService.getInformationById(id));
    }

    //change password
    @PostMapping("id/{id}/change-password")
    public ResponseEntity<Map<String,Object>> changePassword(@PathVariable("id") Integer id,
                                                  @RequestParam("oldPassword") String oldPassword,
                                                  @RequestParam("newPassword") String newPassword){
        return ResponseEntity.ok().body(accountService.changePassword(id,oldPassword,newPassword));
    }

    //change information
    @PostMapping("id/{id}/change-information")
    public ResponseEntity<Map<String,Object>> changeInformation(@PathVariable("id") Integer id,
                                                  @RequestParam("fullname") String fullname,
                                                  @RequestParam("phone") String phone,
                                                  @RequestParam("address") String address){
        return ResponseEntity.ok().body(accountService.changeInformation(id,fullname,phone,address));
    }
}
