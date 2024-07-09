package com.fpt.edu.service;

import com.fpt.edu.dto.NotifyDTO;
import com.fpt.edu.entity.Member;
import com.fpt.edu.status.NotifyType;

import java.util.List;

public interface INotifyService {
    public NotifyDTO insertNotify(Member member, String title, String description, NotifyType notifiableType, Integer notifiableId);
    public void deleteNotify(Integer notifyId);

    List<NotifyDTO> getNotifyByMemberId(Integer id);

    NotifyDTO readNotify(Integer id);
}
