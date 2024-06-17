package com.fpt.edu.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {


    private final String[] PUBLIC_ENDPOINTS = {
            "/auth/token", // login
            "/auth/introspect", // check token
            "/account/register", // register
            "/auth/logout", // logout
            "/auth/refresh-token", // refresh token
    };

    private final String[] MEMBER_POST_ENDPOINTS = {
            "/valuation/create", // create valuation
            "response/confirm-final-valuation-by-member/{id}",

    };
    private final String[] MEMBER_GET_ENDPOINTS = {
            "/valuation/view-sent-request/{id}",
            "/response/view-valuation-response/{id}",
            "/member/info"
    };
    private final String[] STAFF_POST_ENDPOINTS = {
            "/valuation/preliminary-valuation",
            "/valuation/product-received",
            "/product/add-product",
            "/valuation/send-final-valuation-to-member"
    };
    private final String[] STAFF_GET_ENDPOINTS = {
            "/valuation/requested" //
            , "/valuation/request/status/product-received",
            "/valuation/get-all-valuation-manager-approved",
            "/valuation/view-manager-approved-detail/{id}",

    };

    private final String[] MANAGER_POST_ENDPOINTS = {
            "/valuation/approve-final-valuation/{id}" //
            , "/valuation/cancel-final-valuation/{id}",
            "/auction/create-session",
            "/auction/add-lot-to-session",
    };
    private final String[] MANAGER_GET_ENDPOINTS = {
            "/valuation/get-all-final-valuations" //
            , "/valuation/request/status/product-received",
            "/valuation/view-final-request-details/{id}",
            "/lot/ready-lot"
    };


    @Value("${jwt.signerKey}")
    private String SIGNER_KEY;

    @Autowired
    CustomJwtDecoder customJwtDecoder;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionManagement -> sessionManagement
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                         .requestMatchers("/").permitAll()
                         .anyRequest().permitAll()
//                        .requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS).permitAll()
//                        .requestMatchers(HttpMethod.POST, MEMBER_POST_ENDPOINTS).hasAuthority("SCOPE_MEMBER")
//                        .requestMatchers(HttpMethod.GET, MEMBER_GET_ENDPOINTS).hasAuthority("SCOPE_MEMBER")
//                        .requestMatchers(HttpMethod.POST, STAFF_POST_ENDPOINTS).hasAuthority("SCOPE_STAFF")
//                        .requestMatchers(HttpMethod.GET, STAFF_GET_ENDPOINTS).hasAuthority("SCOPE_STAFF")

                    //    .anyRequest().authenticated()


                );
        http.oauth2ResourceServer(oauth2 ->
                oauth2.jwt(jwt -> jwt.decoder(customJwtDecoder)));


        return http.build();
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration =  new CorsConfiguration();
//        configuration.addAllowedOrigin("*");
//        configuration.addAllowedMethod("*");
//        configuration.addAllowedHeader("*");
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }

    @Bean
    JwtDecoder jwtDecoder() {
        SecretKeySpec secretKeySpec = new SecretKeySpec(SIGNER_KEY.getBytes(), "HS512");
        return NimbusJwtDecoder.withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512).build();
    }
}