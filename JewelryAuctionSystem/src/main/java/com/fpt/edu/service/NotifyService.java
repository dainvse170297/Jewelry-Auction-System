package com.fpt.edu.service;

import com.fpt.edu.dto.NotifyDTO;
import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.NotifyMapper;
import com.fpt.edu.repository.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public class NotifyService implements INotifyService{
    private INotifyRepository iNotifyRepository;
    private IMemberRepository iMemberRepository;
    private NotifyMapper NotifyMapper;
    @Override
    public NotifyDTO insertNotify(Integer memberId, String title, String description) {
        Notify notify = new Notify();
        Member member = iMemberRepository.getReferenceById(memberId);
        notify.setMember(member);
        notify.setTitle(title);
        notify.setDescription(description);
        notify.setDate(LocalDate.now());
        return NotifyMapper.toNotifyDTO(iNotifyRepository.save(notify));
    }

    @Override
    public void deleteNotify(Integer notifyId) {
        iNotifyRepository.deleteById(notifyId);
    }
}
