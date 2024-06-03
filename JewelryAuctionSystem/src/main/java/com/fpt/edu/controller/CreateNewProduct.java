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
        ValuationRequestStatus status = ValuationRequestStatus.RECEIVE;
        List<ValuationRequestDTO> valuationRequestDTO = createNewProductService.getRequestedValuationRequestByMemberStatusReceive(status);
        return valuationRequestDTO;
    }

    @GetMapping("/requests/{id}")
    public ValuationRequestDTO getRequestedValuationRequestById(@PathVariable("id") Integer id) {
        ValuationRequestDTO valuationRequestDTO = createNewProductService.getValuationRequestById(id);
        return valuationRequestDTO;
    }

    @PostMapping("/create/newproduct")
    public  ProductDTO createProduct(@RequestBody ProductDTO productDTO) {
        ProductDTO newProductDTO = createNewProductService.createProduct(productDTO);
        return newProductDTO;
    }


    @PostMapping("/createlot")
    public  LotDTO createLot(@RequestBody LotDTO lot) {
        LotDTO newlot = createNewProductService.createLot(lot);
        return newlot;
    }
    @PutMapping("/update/{id}")
    public   ValuationRequestDTO updateStatus(@PathVariable("id") int id, @RequestBody ValuationRequestDTO valuationRequestDTO) {
        ValuationRequestDTO valuationRequestDTO1 =createNewProductService.update(id,valuationRequestDTO);
        return valuationRequestDTO1;
    }


}
