package com.fpt.edu.mapper;

import com.fpt.edu.dto.NotifyDTO;
import com.fpt.edu.entity.*;
import org.springframework.stereotype.Component;

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
}
