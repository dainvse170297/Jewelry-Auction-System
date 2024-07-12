package com.fpt.edu.controller;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.entity.Account;
import com.fpt.edu.service.IStaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/staff")
@RequiredArgsConstructor
public class StaffController {

    private final IStaffService staffService;

    @GetMapping("/accounts")
    public ResponseEntity<List<AccountDTO>> getAllStaffAccounts(){
        return ResponseEntity.ok(staffService.getAllStaffAccounts());
    }

    @GetMapping("/accounts/{id}")
    public ResponseEntity<AccountDTO> getStaffAccountById(@PathVariable int id){
        return ResponseEntity.ok(staffService.getStaffAccountById(id));
    }

}
