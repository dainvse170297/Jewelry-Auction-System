package com.fpt.edu.controller;

import com.fpt.edu.dto.NotifyDTO;
import com.fpt.edu.service.INotifyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/notify")
@RequiredArgsConstructor
public class NotifyController {
    private final INotifyService iNotifyService;
    //get all notify by member id
    @PostMapping("/member/{id}")
    public List<NotifyDTO> getNotifyByMemberId(@PathVariable("id") Integer id) {
        return iNotifyService.getNotifyByMemberId(id);
    }

    @GetMapping("/read/{id}")
    public NotifyDTO readNotify(@PathVariable Integer id) {
        return iNotifyService.readNotify(id);
    }
}
