package com.fpt.edu.response;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {

    private String token;
    private AccountDTO account;

}
