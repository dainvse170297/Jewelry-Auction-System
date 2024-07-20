package com.fpt.edu.controller;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.entity.Account;
import com.fpt.edu.service.IAccountService;
import com.fpt.edu.service.IStaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/staff")
@RequiredArgsConstructor
public class StaffController {

    private final IStaffService staffService;
    private final IAccountService accountService;

    @GetMapping("/accounts")
    public ResponseEntity<List<AccountDTO>> getAllStaffAccounts() {
        return ResponseEntity.ok(staffService.getAllStaffAccounts());
    }

    @GetMapping("/accounts/{id}")
    public ResponseEntity<AccountDTO> getStaffAccountById(@PathVariable int id){
        return ResponseEntity.ok(staffService.getStaffAccountById(id));
    }

    @PostMapping("/account/register")
    public ResponseEntity<Account> createStaffAccount(@RequestParam("username") String username,
                                                      @RequestParam("password") String password,
                                                      @RequestParam("fullName") String fullName) {

        return ResponseEntity.ok().body(accountService.createStaffAccount(username, password, fullName));
    }

    @GetMapping("/account/{id}")
    public ResponseEntity<Map<String, Object>> getAccountInfo(@PathVariable("id") Integer id) {
        return ResponseEntity.ok().body(accountService.getAccountInfo(id));
    }

    @PostMapping("/account/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteAccount(@PathVariable("id") Integer id) { //acccount id chu ko phai staff id
        return ResponseEntity.ok().body(accountService.deleteAccount(id));
    }

    @PostMapping("/account/update/{id}")
    public ResponseEntity<Account> updateStaffAccount(@PathVariable("id") Integer id,
                                                                 @RequestParam("password") String password,
                                                                 @RequestParam("fullName") String fullName) {
        return ResponseEntity.ok().body(accountService.updateStaffAccount(id, password, fullName));
    }
}
