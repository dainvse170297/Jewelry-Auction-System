package com.fpt.edu.service;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.mapper.LotM;
import com.fpt.edu.repository.IValuationRequestRepository;
import com.fpt.edu.repository.LotRepository;
import com.fpt.edu.status.LotStatus;
import com.fpt.edu.status.ValuationRequestStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class LotService  implements ILotService{
    @Autowired
    private IValuationRequestRepository iValuationRequestRepository;

    @Autowired
    private LotRepository lotRepository;
    @Override
    public List<LotDTO> listLotStatusREADY(LotStatus status) {
        List<LotDTO> LotDTOList = new ArrayList<>();
        List<Lot> LotList = lotRepository.findByStatus(status);
        for (Lot lot : LotList) {
            LotDTOList.add(LotM.mapToDTO(lot));
            return LotDTOList;
        }
        return List.of();
    }

    @Override
    public LotDTO createLot(int id, LotDTO lotDTO) {
        Lot lot = LotM.mapToEntity(lotDTO);
        lot.setStatus(LotStatus.WAITING);
        ValuationRequest valuationRequest = iValuationRequestRepository.getReferenceById(id);
        valuationRequest.setValuationStatus(ValuationRequestStatus.PENDING_MANAGER_APPROVAL);
        lot = lotRepository.save(lot);
        return LotM.mapToDTO(lot);
    }
}
