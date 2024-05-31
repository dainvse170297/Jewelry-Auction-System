package com.fpt.edu.service;

import com.fpt.edu.dto.NotifyDTO;

public interface INotifyService {
    public NotifyDTO insertNotify(Integer memberId, String title, String description);
    public void deleteNotify(Integer notifyId);
}
