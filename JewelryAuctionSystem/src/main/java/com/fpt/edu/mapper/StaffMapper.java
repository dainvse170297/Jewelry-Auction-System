package com.fpt.edu.mapper;

import com.fpt.edu.dto.StaffDTO;
import com.fpt.edu.entity.Staff;
import org.springframework.stereotype.Component;

@Component
public class StaffMapper {
    public StaffDTO toStaffDTO(Staff staff){
        StaffDTO staffDTO = new StaffDTO();
        staffDTO.setId(staff.getId());
        staffDTO.setFullname(staff.getFullname());
        return staffDTO;
    }
}
