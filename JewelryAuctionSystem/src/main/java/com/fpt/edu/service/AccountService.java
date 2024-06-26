package com.fpt.edu.service;

import com.fpt.edu.dto.AccountDTO;
import com.fpt.edu.dto.MemberDTO;
import com.fpt.edu.dto.StaffDTO;
import com.fpt.edu.entity.Account;

import com.fpt.edu.entity.InvalidatedToken;
import com.fpt.edu.mapper.AccountMapper;


import com.fpt.edu.exception.UsernameNotFoundException;

import com.fpt.edu.mapper.AuthenticationMapper;
import com.fpt.edu.mapper.MemberMapper;
import com.fpt.edu.mapper.StaffMapper;
import com.fpt.edu.repository.IAccountRepository;
import com.fpt.edu.repository.InvalidatedTokenRepository;
import com.fpt.edu.security.request.IntrospectRequest;
import com.fpt.edu.security.request.LogoutRequest;
import com.fpt.edu.security.request.RefreshRequest;
import com.fpt.edu.security.response.AuthenticationResponse;
import com.fpt.edu.security.response.IntrospectResponse;
import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.Role;
import com.fpt.edu.exception.EmailExistedException;
import com.fpt.edu.exception.UsernameExistedException;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.repository.IRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.experimental.NonFinal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

import java.text.ParseException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AccountService implements IAccountService {

    private static final Logger log = LoggerFactory.getLogger(AccountService.class);
    private final IAccountRepository accountRepository;
    private final IMemberRepository memberRepository;
    private final IRoleRepository roleRepository;
    private final InvalidatedTokenRepository invalidatedTokenRepository;
    private final MemberMapper memberMapper;
    private final StaffMapper staffMapper;


    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected Long VALID_DURATION;


    @NonFinal
    @Value("${jwt.refresh-duration}")
    protected Long REFRESH_DURATION;


    @Override
    public AuthenticationResponse login(String username, String password) throws JOSEException {

        Account account = accountRepository.findByUsernameAndPassword(username, password).orElseThrow(
                () -> new UsernameNotFoundException("Invalid username or password")
        );

        String role = account.getRole().getName();
        Long accountId = (long) account.getId();
        String token = generateToken(username, role, accountId);

        return AuthenticationMapper.toAuthenticationResponse(account, token);

    }

    // dung de xac thuc token co hop le hay khong. neu co tra ve true neu khong tra ve false
    @Override
    public IntrospectResponse introspect(IntrospectRequest introspectRequest) throws JOSEException, ParseException {

        String token = introspectRequest.getToken();
        boolean isvalid = true;
        try {
            verifyToken(token, false);
        } catch (JOSEException e) {
            isvalid = false;
        }


        return new IntrospectResponse(isvalid);

    }

    @Override
    public AccountDTO getAccountFromToken(IntrospectRequest introspectRequest) throws ParseException, JOSEException {
        String token = introspectRequest.getToken();

        if (!(introspect(new IntrospectRequest(token)).isValid())) {
            throw new JOSEException("JWT token verification failed");
        }
        SignedJWT signedJWT = SignedJWT.parse(token);
        Long accountId = (Long) signedJWT.getJWTClaimsSet().getClaim("accountId");

        Account account = accountRepository.findById(accountId.intValue()).orElseThrow(
                () -> new RuntimeException("Account not found")
        );
        return AccountMapper.toAccountDTO(account);

    }


    @Override
    public Account createAccount(String username, String password, String fullName, String email, String phone, String address) {
        Account account = new Account();
        Member member = new Member();
        if (accountRepository.findByUsername(username).isPresent()) {
            throw new UsernameExistedException("Username is existed");
        } else if (memberRepository.findByEmail(email).isPresent()) {
            throw new EmailExistedException("Email is existed");
        } else {
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


    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try {

            var signToken = verifyToken(request.getToken(), true);
            String jit = signToken.getJWTClaimsSet().getJWTID();
            LocalDateTime expirationTime = signToken.getJWTClaimsSet().
                    getExpirationTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            InvalidatedToken invalidatedToken = new InvalidatedToken();
            invalidatedToken.setId(jit);
            invalidatedToken.setExpiredTime(expirationTime);
            invalidatedTokenRepository.save(invalidatedToken);
        } catch (JOSEException e) {
            log.info("Token is expired");

        }


    }

    public AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException {

        SignedJWT signedJWT = SignedJWT.parse(request.getToken()); // lay ra thong tin tu token
        // dua token vao danh sach token bi huy

        logout(new LogoutRequest(request.getToken()));

        String username = signedJWT.getJWTClaimsSet().getSubject();
        String role = (String) signedJWT.getJWTClaimsSet().getClaim("scope");
        Long accountId = (Long) signedJWT.getJWTClaimsSet().getClaim("accountId");
        String token = generateToken(username, role, accountId);
        Account account = accountRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("Invalid username or password")
        );
        return AuthenticationMapper.toAuthenticationResponse(account, token);
    }


    private SignedJWT verifyToken(String token, boolean isRefreshToken) throws JOSEException, ParseException {
        JWSVerifier jwsVerifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expirationTime = (isRefreshToken)
                ? new Date(signedJWT.getJWTClaimsSet().getIssueTime().toInstant().plus(REFRESH_DURATION, ChronoUnit.SECONDS).toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        boolean verified = signedJWT.verify(jwsVerifier);

        if (!(verified && expirationTime.after(new Date()))) {
            throw new JOSEException("JWT token verification failed");
        }

        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID())) {
            throw new JOSEException("Token is invalidated");
        }

        return signedJWT;
    }


    private String generateToken(String username, String role, Long accountId) throws JOSEException {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(username)
                .issuer("http://localhost:8080")
                .issueTime(Date.from(Instant.now()))
                .expirationTime(Date.from(Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS)))
                .claim("scope", role)
                .claim("accountId", accountId)
                .jwtID(UUID.randomUUID().toString())
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

    @Override
    public Map<String, Object> getInformationById(Integer id) {
        Account account = accountRepository.getReferenceById(id);
        Map<String, Object> map = new HashMap<>();
        AccountDTO accountDTO;
        if (account.getMembers() != null) {
            accountDTO = AccountMapper.toAccountDTO(account);
            MemberDTO memberDTO = memberMapper.toMemberDTO(account.getMembers());
            map.put("account", accountDTO);
            map.put("member", memberDTO);
        } else if (account.getStaff() != null) {
            accountDTO = AccountMapper.toAccountDTO(account);
            StaffDTO staffDTO = staffMapper.toStaffDTO(account.getStaff());
            map.put("account", accountDTO);
            map.put("staff", staffDTO);
        }
        return map;
    }
    @Override
    public Map<String, Object> changePassword(Integer id, String oldPassword, String newPassword) {
        Account account = accountRepository.getReferenceById(id);
        if (!account.getPassword().equals(oldPassword)) {
            throw new RuntimeException("Old password is incorrect");
        }
        account.setPassword(newPassword);
        accountRepository.save(account);
        Map<String, Object> map = getInformationById(id);
        return map;
    }

    @Override
    public Map<String, Object> changeInformation(Integer id, String fullname, String phone, String address) {
        Account account = accountRepository.getReferenceById(id);
        if (account.getMembers() == null) {
            throw new RuntimeException("Account is not member");
        }
        Member member = account.getMembers();
        member.setFullname(fullname);
        member.setPhone(phone);
        member.setAddress(address);
        memberRepository.save(member);
        Map<String, Object> map = getInformationById(id);
        return map;
    }
}

