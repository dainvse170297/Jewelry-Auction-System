package com.fpt.edu.service;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.entity.Account;
import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.Role;
import com.fpt.edu.exception.UsernameExistedException;
import com.fpt.edu.mapper.AccountMapper;
import com.fpt.edu.mapper.AuthenticationMapper;
import com.fpt.edu.repository.IAccountRepository;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.repository.IRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import com.fpt.edu.response.AuthenticationResponse;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.AllArgsConstructor;
import lombok.experimental.NonFinal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@AllArgsConstructor
public class AccountService implements IAccountService {

    private static final Logger log = LoggerFactory.getLogger(AccountService.class);
    private final IAccountRepository accountRepository;
    private final IMemberRepository memberRepository;
    private final IRoleRepository roleRepository;

    @NonFinal
    protected static final String SIGNER_KEY =
            "mGTSe7P+YzkdmH1KfIElpwED0hyOu6Mv4WZB/Qd54Jgvp4hUp73Tf06SndojREuL";


    @Override
    public AuthenticationResponse login(String username, String password) throws JOSEException {

        Account account = accountRepository.findByUsernameAndPassword(username, password).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        String role = account.getRole().getName();
             String token = generateToken(username,role);

            return AuthenticationMapper.toAuthenticationResponse(account, token);

    }

    @Override
    public Account createAccount(String username, String password, String fullName, String email, String phone, String address) {

        Account account = new Account();
        Member member = new Member();
        if(accountRepository.findByUsername(username).isPresent()){
            throw new UsernameExistedException("Username is existed");
        }else{
            account.setUsername(username);
            account.setPassword(password);
            account.setCreateDate(LocalDateTime.now());
            Role role = roleRepository.findByName("MEMBER");
            account.setRole(role);
            member.setFullname(fullName);
            member.setEmail(email);
            member.setPhone(phone);
            member.setAddress(address);
            account.setMembers(member);
            memberRepository.save(member);
            accountRepository.save(account);
        }
        return account;
    }

    private String generateToken(String username,String role) throws JOSEException {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(username)
                .issuer("http://localhost:8080")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                )).claim("role", role)
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(jwsHeader, payload);
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Error create token", e);
            throw new RuntimeException();
        }

    }


}

