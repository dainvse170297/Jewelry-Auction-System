package com.fpt.edu.mapper;

import com.fpt.edu.dto.NotifyDTO;
import com.fpt.edu.entity.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class NotifyMapper {

    public NotifyDTO toNotifyDTO(Notify notify) {
        NotifyDTO notifyDTO = new NotifyDTO();
        notifyDTO.setId(notify.getId());
        notifyDTO.setMemberId(notify.getMember().getId());
        notifyDTO.setTitle(notify.getTitle());
        notifyDTO.setDescription(notify.getDescription());
        notifyDTO.setIsRead(notify.getIsRead());
        notifyDTO.setNotifiableType(notify.getNotifiableType());
        notifyDTO.setNotifiableId(notify.getNotifiableId());
        return notifyDTO;
    }

    public List<NotifyDTO> toNotifyDTOs(List<Notify> notifyList) {
        return notifyList.stream().map(this::toNotifyDTO).toList();
    }
}
