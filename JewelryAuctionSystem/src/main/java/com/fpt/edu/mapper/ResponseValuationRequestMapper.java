package com.fpt.edu.mapper;


import com.fpt.edu.dto.ResponseRequestValuationDTO;
import com.fpt.edu.entity.ResponseRequestValuation;
import com.fpt.edu.status.ResponseValuationRequestStatus;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class ResponseValuationRequestMapper {



    public ResponseRequestValuationDTO MaptoResponseRequestValuationDTO
            (ResponseRequestValuation responseRequestValuation) {
        ResponseRequestValuationDTO responseRequestValuationDTO = new ResponseRequestValuationDTO();
        responseRequestValuationDTO.setId(responseRequestValuation.getId());
        responseRequestValuationDTO.setStatus(responseRequestValuation.getResponseValuationRequestStatus());
        responseRequestValuationDTO.setValuationPrice(responseRequestValuation.getValuationPrice());
        responseRequestValuationDTO.setTimeResponse(responseRequestValuation.getTimeResponse());
        responseRequestValuationDTO.setStaffId(responseRequestValuation.getStaff().getId());
        return responseRequestValuationDTO;
    }
}
