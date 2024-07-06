package com.fpt.edu.service;

import com.fpt.edu.dto.NotifyDTO;
import com.fpt.edu.entity.Member;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.NotifyMapper;
import com.fpt.edu.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotifyService implements INotifyService{

    private final INotifyRepository iNotifyRepository;
    private final IMemberRepository iMemberRepository;
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

    @Override
    public List<NotifyDTO> getNotifyByMemberId(Integer id) {
        return NotifyMapper.toNotifyDTOs(iNotifyRepository.findByMemberOrderByIdDesc(iMemberRepository.getReferenceById(id)));
    }

    @Override
    public NotifyDTO readNotify(Integer id) {
        Notify thisNotify = iNotifyRepository.findById(id).get();
        thisNotify.setIsRead(true);
        iNotifyRepository.save(thisNotify);
        return NotifyMapper.toNotifyDTO(thisNotify);
    }
}
