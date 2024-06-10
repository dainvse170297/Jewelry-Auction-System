package com.fpt.edu.mapper;

import com.fpt.edu.dto.NotifyDTO;
import com.fpt.edu.dto.NotifyFinalValuationDTO;
import com.fpt.edu.entity.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;

@Component
public class NotifyMapper {

    public NotifyDTO toNotifyDTO(Notify notify) {
        NotifyDTO notifyDTO = new NotifyDTO();
        notifyDTO.setId(notify.getId());
        notifyDTO.setMemberId(notify.getMember().getId());
        notifyDTO.setTitle(notify.getTitle());
        notifyDTO.setDescription(notify.getDescription());
        return notifyDTO;
    }


    public NotifyFinalValuationDTO mapToNotifyFinalValuationDTO(Product product, ValuationRequest valuationRequest){

        String title = "Your request accepted by Manager! ";
        String description = "We have received your request and This is information of your request: " +
                "| Category: " + product.getCategory().getName() +
                "| Name: " + product.getName() +
                "| Description of Product: " + product.getDescription() +
                "| Estimate Price: " +  product.getEstimatePriceMin() + " - " +product.getEstimatePriceMax();

        return new NotifyFinalValuationDTO(
                valuationRequest.getMember().getId(),
                title,
                description,
                LocalDateTime.now(),
                false
        );
    }

}
