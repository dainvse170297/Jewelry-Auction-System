package com.fpt.edu.controller;

import com.fpt.edu.dto.*;
import com.fpt.edu.service.ResponseValuationRequestService;
import com.fpt.edu.service.ValuationRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/valuation")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ValuationRequestController {

    private final ValuationRequestService valuationRequestService;
    private final ResponseValuationRequestService responseValuationRequestService;

    //Member create valuation request by description and estimate price
    @PostMapping("/create")
    @CrossOrigin(origins = "*")
    public ResponseEntity<ValuationRequestDetailDTO> addValuationRequest(@RequestParam("memberId") Integer memberId,
                                                                   @RequestParam("description") String description,
                                                                   @RequestParam(value = "memberEstimatePrice",required = false) BigDecimal memberEstimatePrice,
                                                                   @RequestParam("image") Set<MultipartFile> files
    ) throws IOException {
        return ResponseEntity.ok(valuationRequestService.create(memberId, description,memberEstimatePrice, files));
    }

    @GetMapping("/all")
    @CrossOrigin(origins = "*")
    public ResponseEntity<List<ValuationRequestDetailDTO>> getAll() {
        return ResponseEntity.ok(valuationRequestService.getAll());
    }

    @GetMapping("/requested")
    @CrossOrigin(origins = "*")
    public ResponseEntity<List<ValuationRequestDetailDTO>> getRequestedValuationRequest() {
        return ResponseEntity.ok(valuationRequestService.getRequestedValuationRequest());
    }

    @PostMapping("/product-received")
    @CrossOrigin(origins = "*")
    public ResponseEntity<ValuationRequestDetailDTO> productReceived(@RequestParam("id") Integer id) {//valuation request id
        return ResponseEntity.ok(valuationRequestService.productReceived(id));
    }


    @PostMapping("/preliminary-valuation")
    @CrossOrigin(origins = "*")
    public ResponseEntity<ValuationRequestDetailDTO> preliminaryValuation(@RequestParam("id") Integer id,
                                                                    @RequestParam("estimateMin") BigDecimal estimatePrice,
                                                                    @RequestParam("estimateMax") BigDecimal estimateMax,
                                                                    @RequestParam("staffId") Integer staffId) {
        return ResponseEntity.ok(valuationRequestService.preliminaryValuation(id, estimatePrice, estimateMax, staffId));
    }

    @GetMapping("/get-preliminary-valuation")
    @CrossOrigin(origins = "*")
    public ResponseEntity<List<ValuationRequestDetailDTO>> getPreliminaryValuationRequest() {
        return ResponseEntity.ok(valuationRequestService.getPreliminaryValuationRequest());
    }

    @GetMapping("/request/status/product-received")
    public ResponseEntity<List<ValuationRequestDTO>> getRequestStatusProductReceived() {
        return ResponseEntity.ok(valuationRequestService.getRequestStatusProductReceived());
    }

    @GetMapping("/request/status/product-received/{id}")
    public ResponseEntity<ValuationRequestDTO> getRequestStatusProductReceivedById(@PathVariable Integer id) {
        return ResponseEntity.ok(valuationRequestService.getRequestByIdAndStatusProductReceived(id));
    }

   
    @GetMapping("/get-all-final-valuations")
    public ResponseEntity<List<FinalValuationRequestDTO>> getListFinalValuationRequest() {
        return ResponseEntity.ok(valuationRequestService.getListFinalValuationRequest());
    }

    @PostMapping("/approve-final-valuation/{id}")
    public ResponseEntity<Map<String, String>> approveFinalValuationRequest(@PathVariable Integer id) {
        return ResponseEntity.ok(valuationRequestService.ApproveFinalValuationRequest(id));
    }

    @PostMapping("/cancel-final-valuation/{id}")
    public ResponseEntity<Map<String, String>> cancelFinalValuationRequest(@PathVariable Integer id) {
        return ResponseEntity.ok(valuationRequestService.CancelFinalValuationRequest(id));
    }

    //bao gom sendNotifyToMember service
    @PostMapping("/send-final-valuation-to-member")
    public ResponseEntity<List<Map<String, String>>> sendFinalValuationToMember(@RequestParam Integer id, //valauation request id
                                                                                @RequestParam Integer staffId) {
        return ResponseEntity.ok(valuationRequestService.sendFinalValuationToMember(id, staffId));
    }

    @GetMapping("/get-all-valuation-manager-approved")
    public ResponseEntity<List<FinalValuationRequestDTO>> getListManagerApproveValuationRequest() {
        return ResponseEntity.ok(valuationRequestService.getListManagerApproveValuationRequest());
    }

    @GetMapping("/view-sent-request/{id}")
    public ResponseEntity<List<ViewValuationRequestDTO>> viewSentRequest(@PathVariable Integer id) {
        return ResponseEntity.ok(valuationRequestService.viewSentRequest(id));
    }

    @GetMapping("/view-my-response-request/{id}") // response id
    public ResponseEntity<ResponseRequestValuationDTO> viewMyResponseRequest(@PathVariable Integer id) {
        return ResponseEntity.ok(responseValuationRequestService.viewMyResponseRequestValuation(id));
    }

    @GetMapping("/view-final-request-details/{id}")
    public ResponseEntity<LotDTO> getDetailsProductById(@PathVariable Integer id) {//valuation request id
        return ResponseEntity.ok(valuationRequestService.getProductDetail(id));
    }

    @GetMapping("/view-manager-approved-detail/{id}") // id valuation request
    public ResponseEntity<ViewDetailValuationRequestFinalApprovedDTO> viewManagerApprovedDetail(@PathVariable Integer id) {
        return ResponseEntity.ok(valuationRequestService.ViewDetailValuationRequestFinalApproved(id));
    }

    @GetMapping("/member-cancel/{id}") // id valuation request
    public ResponseEntity<Boolean> cancelValuationRequest(@PathVariable Integer id) {
        return ResponseEntity.ok(valuationRequestService.cancelValuationRequest(id));
    }

    @GetMapping("/staff-cancel/{id}") // id valuation request
    public ResponseEntity<Boolean> cancelValuationRequestByStaff(@PathVariable Integer id) {
        return ResponseEntity.ok(valuationRequestService.cancelValuationRequestByStaff(id));
    }

}