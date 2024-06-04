package com.fpt.edu.service;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.dto.ProductDTO;
import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.Lot;
import com.fpt.edu.entity.Product;
import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.enums.LotStatus;
import com.fpt.edu.enums.ValuationRequestStatus;
import com.fpt.edu.mapper.LotM;
import com.fpt.edu.mapper.ProductMapper;
import com.fpt.edu.mapper.ValuationRequestMapper;
import com.fpt.edu.repository.IValuationRequestRepository;
import com.fpt.edu.repository.LotRepository;
import com.fpt.edu.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CreateNewProductService {
    @Autowired
    private IValuationRequestRepository iValuationRequestRepository;
    @Autowired
    private LotRepository lotRepository;
    @Autowired
    private ProductRepository productRepository;

    public List<ValuationRequestDTO> getRequestedValuationRequestByMemberStatusReceive(ValuationRequestStatus status) {
        List<ValuationRequestDTO> valuationRequestDTOList = new ArrayList<>();
        List<ValuationRequest> valuationRequestList = iValuationRequestRepository.findByValuationStatus(status);
        for (ValuationRequest valuationRequest : valuationRequestList) {
            valuationRequestDTOList.add(ValuationRequestMapper.mapToDTO(valuationRequest));
            return valuationRequestDTOList;
        }
        return List.of();
    }

    public ValuationRequestDTO getValuationRequestById(Integer id) {
        ValuationRequest valuationRequest = iValuationRequestRepository.findById(id).orElseThrow(() -> new NoSuchElementException("NO EXIST ID:" + id));
        return ValuationRequestMapper.mapToDTO(valuationRequest);
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product newProduct = ProductMapper.mapToEntity(productDTO);
        newProduct = productRepository.save(newProduct);
        return ProductMapper.mapToDTO(newProduct);
    }


    public LotDTO createLot(LotDTO lotDTO) {
        Lot lot = LotM.mapToEntity(lotDTO);
        lot.setStatus(LotStatus.WAITING);
        lot = lotRepository.save(lot);
        return LotM.mapToDTO(lot);
    }

    public ValuationRequestDTO update(int id, ValuationRequestDTO valuationRequestDTO) {
        ValuationRequest valuationRequest = iValuationRequestRepository.findById(id).orElseThrow(() -> new NoSuchElementException("No Exit ID " + id));
        valuationRequest.setValuationStatus(ValuationRequestStatus.PENDING_MANAGER_APPROVAL);
        valuationRequest = iValuationRequestRepository.save(valuationRequest);
        return ValuationRequestMapper.mapToDTO(valuationRequest);

    }
}
