package com.fpt.edu.controller;

import com.fpt.edu.dto.LotDTO;
import com.fpt.edu.dto.ProductDTO;
import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.enums.ValuationRequestStatus;
import com.fpt.edu.service.CreateNewProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/create")
public class CreateNewProduct {
    @Autowired
    private CreateNewProductService createNewProductService;

    @GetMapping("/requests/status")
    public List<ValuationRequestDTO> getRequestedValuationStatusReceive() {
        ValuationRequestStatus status = ValuationRequestStatus.PRODUCT_RECEIVED;
        return createNewProductService.getRequestedValuationRequestByMemberStatusReceive(status);
    }

    @GetMapping("/requests/{id}")
    public ValuationRequestDTO getRequestedValuationRequestById(@PathVariable("id") Integer id) {
        return createNewProductService.getValuationRequestById(id);
    }

    @PostMapping("/create/newproduct")
    public ProductDTO createProduct(@RequestBody ProductDTO productDTO) {
        return createNewProductService.createProduct(productDTO);
    }


    @PostMapping("/createlot")
    public LotDTO createLot(@RequestBody LotDTO lot) {
        return createNewProductService.createLot(lot);
    }

    @PutMapping("/update/{id}")
    public ValuationRequestDTO updateStatus(@PathVariable("id") int id, @RequestBody ValuationRequestDTO valuationRequestDTO) {
        return createNewProductService.update(id, valuationRequestDTO);
    }


}
