package com.fpt.edu.mapper;

import com.fpt.edu.dto.AuctionSessionDTO;
import com.fpt.edu.dto.StaffDTO;
import com.fpt.edu.entity.AuctionSession;

public class AuctionSessionM {
    public static AuctionSession maptoEntity(AuctionSessionDTO sessionDTO) {
        return new AuctionSession(
                sessionDTO.getId(),
                StaffM.maptoEntity(sessionDTO.getStaffDTO()),
                sessionDTO.getStartingBid(),
                sessionDTO.getStartTime(),
                sessionDTO.getEndTime(),
                sessionDTO.getName(),
                sessionDTO.getDescription(),
                sessionDTO.getStatus()
        );
    }

    public static AuctionSessionDTO mapToDTO(AuctionSession session) {
        return new AuctionSessionDTO(
          session.getId(),
          StaffM.maptoDTO(session.getStaff()),
          session.getStartingBid(),
          session.getStartTime(),
          session.getEndTime(),
          session.getName(),
          session.getDescription(),
          session.getStatus()
        );

    }
}
