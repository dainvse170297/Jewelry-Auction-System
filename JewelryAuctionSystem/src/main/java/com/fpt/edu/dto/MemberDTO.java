package com.fpt.edu.dto;

import com.fpt.edu.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberDTO {
    private Integer id;
    private Integer creditCardId;
    private Integer accountId;
    private BigDecimal financialProofAmount;
    private String email;
    private String fullname;
    private String address;
    private String phone;
    private Set<Integer> auctionRegisterIds = new LinkedHashSet<>();
    private Set<Integer> bidIds = new LinkedHashSet<>();
    private Set<Integer> financialProofRequestIds = new LinkedHashSet<>();
    private Set<Integer> notifyIds = new LinkedHashSet<>();
    private Set<Integer> valuationRequestIds = new LinkedHashSet<>();
}
