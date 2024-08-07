package com.fpt.edu.mapper;

import com.fpt.edu.dto.AuctionSessionDTO;
import com.fpt.edu.entity.AuctionSession;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AuctionSessionMapper {
    String defaultImageURL = "https://www.fortunaauction.com/wp-content/uploads/2019/12/Upcoming-Auction-Placeholder-Template.jpg";
    public AuctionSessionDTO toAuctionSessionDTO(AuctionSession auctionSession) {
        AuctionSessionDTO auctionSessionDTO = new AuctionSessionDTO();
        auctionSessionDTO.setId(auctionSession.getId());
        auctionSessionDTO.setStaffId(auctionSession.getStaff().getId());
        auctionSessionDTO.setStartingBid(auctionSession.getStartingBid());
        auctionSessionDTO.setStartTime(auctionSession.getStartTime());
        auctionSessionDTO.setEndTime(auctionSession.getEndTime());
        auctionSessionDTO.setName(auctionSession.getName());
        auctionSessionDTO.setDescription(auctionSession.getDescription());
        auctionSessionDTO.setStatus(auctionSession.getStatus());
        auctionSessionDTO.setDefaultImageURL(defaultImageURL);
        return auctionSessionDTO;
    }

    public List<AuctionSessionDTO> toAuctionSessionDTOList(List<AuctionSession> auctionSessions) {
        return auctionSessions.stream().map(this::toAuctionSessionDTO).collect(Collectors.toList());
    }

}
