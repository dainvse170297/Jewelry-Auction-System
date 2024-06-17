package com.fpt.edu.config;

import com.fpt.edu.security.request.IntrospectRequest;
import com.fpt.edu.security.response.IntrospectResponse;
import com.fpt.edu.service.AccountService;
import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.text.ParseException;
import java.util.Objects;

@Component
public class CustomJwtDecoder implements JwtDecoder {

    @Autowired
    private AccountService accountService;

    private NimbusJwtDecoder nimbusJwtEncoder = null;
    @Value("${jwt.signerKey}")
    private String SIGNER_KEY;

    @Override
    public Jwt decode(String token) {
        try {
       IntrospectResponse response = accountService.introspect(new IntrospectRequest(token));
        if(!(response.isValid())){
            throw new RuntimeException("Token is invalid");
        }


        } catch (ParseException | JOSEException e) {
            throw new RuntimeException(e);
        }
        if(Objects.isNull(nimbusJwtEncoder)){
            SecretKeySpec secretKeySpec = new SecretKeySpec(SIGNER_KEY.getBytes(), "HS512");
            nimbusJwtEncoder = NimbusJwtDecoder.withSecretKey(secretKeySpec)
                    .macAlgorithm(MacAlgorithm.HS512).build();
        }


        return nimbusJwtEncoder.decode(token);
    }
}
