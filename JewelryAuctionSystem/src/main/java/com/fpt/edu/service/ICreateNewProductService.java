package com.fpt.edu.service;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.dto.ProductDTO;
import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.enums.ValuationRequestStatus;

import java.util.List;

public interface ICreateNewProductService {
    public List<ValuationRequestDTO> getRequestedValuationRequestByMemberStatusReceive(ValuationRequestStatus status);
    public ValuationRequestDTO getValuationRequestById(Integer id);
    public ProductDTO createProduct(ProductDTO productDTO);
    public LotDTO createLot(LotDTO lotDTO);
    public ValuationRequestDTO update(int id, ValuationRequestDTO valuationRequestDTO);}