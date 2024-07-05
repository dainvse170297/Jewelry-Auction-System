package com.fpt.edu.service;

import com.fpt.edu.dto.*;
import com.fpt.edu.entity.Product;
import org.springframework.web.multipart.MultipartFile;
import com.fpt.edu.entity.ValuationRequest;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Set;

public interface IValuationRequestService {
    public ValuationRequestDetailDTO create(Integer memberId, String description, BigDecimal memberEstimatePrice, Set<MultipartFile> files);

    public List<ValuationRequestDetailDTO> getAll(Integer page);

    public List<ValuationRequestDetailDTO> getRequestedValuationRequest(Integer page);

    public List<ValuationRequestDetailDTO> getPreliminaryValuationRequest(Integer page);

    public ValuationRequestDetailDTO productReceived(Integer id);

    public List<ValuationRequestDTO> getRequestStatusProductReceived(Integer page);

    public ValuationRequestDTO getRequestByIdAndStatusProductReceived(int id);

    public List<FinalValuationRequestDTO> getListFinalValuationRequest(Integer page);

    public Map<String,String> ApproveFinalValuationRequest(Integer id);

    public Map<String,String> CancelFinalValuationRequest(Integer id);

    public List<FinalValuationRequestDTO> getListManagerApproveValuationRequest(Integer page);

    public List<Map<String,String>> sendFinalValuationToMember(Integer id, Integer staffId);

    public Map<String,String> sendNotifyToMember(ValuationRequest valuationRequest, Product product);

    public List<ViewValuationRequestDTO> viewSentRequest(Integer memberId,Integer page);

    public ValuationRequestDetailDTO preliminaryValuation(Integer id, BigDecimal estimateMin, BigDecimal estimateMax, Integer staffId);

    public LotDTO getProductDetail(Integer id);
    
    public ViewDetailValuationRequestFinalApprovedDTO ViewDetailValuationRequestFinalApproved(Integer id);

    public Boolean cancelValuationRequest(Integer id);

    public Boolean cancelValuationRequestByStaff(Integer id);

    public ValuationRequestDetailDTO getValuationRequestDetail(Integer id);

}