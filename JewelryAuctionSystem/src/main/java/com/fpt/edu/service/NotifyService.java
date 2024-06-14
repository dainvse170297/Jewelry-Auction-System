package com.fpt.edu.service;

import com.fpt.edu.dto.NotifyDTO;
import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.NotifyMapper;
import com.fpt.edu.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NotifyService implements INotifyService{

    private final INotifyRepository iNotifyRepository;
    private final NotifyMapper NotifyMapper;
    @Override
    public NotifyDTO insertNotify(Member member, String title, String description) {
        Notify notify = new Notify();
        notify.setMember(member);
        notify.setTitle(title);
        notify.setDescription(description);
        notify.setDate(LocalDateTime.now());
        notify.setIsRead(false);
        return NotifyMapper.toNotifyDTO(iNotifyRepository.save(notify));
    }

    @Override
    public void deleteNotify(Integer notifyId) {
        iNotifyRepository.deleteById(notifyId);
    }
}
