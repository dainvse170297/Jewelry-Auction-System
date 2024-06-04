package com.fpt.edu.service;

import com.fpt.edu.dto.*;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.NotifyMapper;
import com.fpt.edu.mapper.ProductMapper;
import com.fpt.edu.repository.*;
import com.fpt.edu.status.ValuationRequestStatus;
import com.fpt.edu.mapper.ValuationRequestMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.View;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ValuationRequestService implements IValuationRequestService{

    private final IValuationRequestRepository iValuationRequestRepository;
    private final IMemberRepository iMemberRepository;
    private final ValuationRequestMapper valuationRequestMapper;
    private final INotifyRepository iNotifyRepository;
    private final IValuationImageRepository iValuationImageRepository;
    private final CloudinaryService cloudinaryService;
    private final IProductRepository iProductRepository;
    private final ProductMapper ProductMapper;
    private final IProductImageRepository IProductImageRepository;
    private final NotifyMapper NotifyMapper;
    @Override
    public ValuationRequestDTO create(Integer memberId, String description, BigDecimal estimateMin, BigDecimal estimateMax, Set<MultipartFile> files) {
        ValuationRequest valuationRequest = new ValuationRequest();
        //set request
        Member member = iMemberRepository.getReferenceById(memberId);
        System.out.println("Member: " + member);
        valuationRequest.setMember(member);
        valuationRequest.setDescription(description);
        valuationRequest.setTimeRequest(LocalDate.now());
        valuationRequest.setEstimatePriceMin(estimateMin);
        valuationRequest.setEstimatePriceMax(estimateMax);
        valuationRequest.setResponseRequestValuations(null);
        valuationRequest.setValuationStatus(ValuationRequestStatus.REQUESTED);
        valuationRequest.setProduct(null);
        ValuationRequestDTO valuationRequestDTO = valuationRequestMapper.mapToValuationRequestDTO(iValuationRequestRepository.save(valuationRequest));
        //set image
        for (MultipartFile file : files) {
            Map image;
            try {
                image = cloudinaryService.uploadFile(file);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            ValuationImage valuationImage = new ValuationImage();
            valuationImage.setImageUrl(image.get("url").toString());
            valuationImage.setImageId(image.get("public_id").toString());
            valuationImage.setRequest(valuationRequest);
            iValuationImageRepository.save(valuationImage);
        }
        //set notify
        Notify notify = new Notify();
        notify.setMember(member);
        notify.setTitle(createRequestTitle(valuationRequest));
        notify.setDescription(createRequestMessage(valuationRequest));
        notify.setDate(LocalDate.now());
        iNotifyRepository.save(notify);
        return valuationRequestDTO;
    }

    @Override
    public List<ValuationRequestDTO> getRequestedValuationRequest() {
        return valuationRequestMapper.mapToValuationRequestDTOList(iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.REQUESTED));
    }

    @Override
    public ValuationRequestDTO productReceived(Integer id) {
        ValuationRequest valuationRequest = iValuationRequestRepository.getReferenceById(id);
        valuationRequest.setValuationStatus(ValuationRequestStatus.PRODUCT_RECEIVED);
        Member member = iMemberRepository.getReferenceById(valuationRequestMapper.mapToValuationRequestDTO(valuationRequest).getMemberId());
        LocalDate createDate = LocalDate.now();
        Notify notify = new Notify();
        notify.setMember(member);
        notify.setTitle(productReceivedTitle(valuationRequest));
        notify.setDescription(productReceivedMessage(valuationRequest));
        notify.setDate(createDate);
        iNotifyRepository.save(notify);
        ValuationRequestDTO dto = valuationRequestMapper.mapToValuationRequestDTO(iValuationRequestRepository.save(valuationRequest));
        return dto;
    }

    @Override
    public List<ValuationRequestDTO> getRequestStatusProductReceived() {
        List<ValuationRequestDTO> result = valuationRequestMapper.mapToValuationRequestDTOList(iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.PRODUCT_RECEIVED));
        System.out.println("Result: ");
        for (ValuationRequestDTO dto : result) {
            System.out.println(dto);
        }
        return result;
    }

    @Override
    public ValuationRequestDTO getRequestByIdAndStatusProductReceived(int id) {
        return valuationRequestMapper.mapToValuationRequestDTO(iValuationRequestRepository.findByIdAndValuationStatus(id, ValuationRequestStatus.PRODUCT_RECEIVED));
    }

    @Override
    public ValuationRequestDTO preliminaryValuation(Integer id, BigDecimal estimateMin, BigDecimal estimateMax) {
        ValuationRequest valuationRequest = iValuationRequestRepository.getReferenceById(id);
        valuationRequest.setValuationStatus(ValuationRequestStatus.PRELIMINARY_VALUATED);
        valuationRequest.setEstimatePriceMin(estimateMin);
        valuationRequest.setEstimatePriceMax(estimateMax);
        Member member = valuationRequest.getMember();
        Notify notify = new Notify();
        notify.setMember(member);
        notify.setTitle(preliminaryValuatedTitle(valuationRequest));
        notify.setDescription(preliminaryValuatedMessage(valuationRequest));
        notify.setDate(LocalDate.now());
        iNotifyRepository.save(notify);
        return valuationRequestMapper.mapToValuationRequestDTO(iValuationRequestRepository.save(valuationRequest));
    }

    @Override
    public List<FinalValuationRequestDTO> getListFinalValuationRequest() {
        return valuationRequestMapper.mapToFinalValuationRequestDTOList(
                iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.PENDING_MANAGER_APPROVAL));
    }
    @Override
    public ProductDTO viewProductDetails(Integer productId) {
        Optional<Product> productOpt = iProductRepository.findById(productId);
        ValuationRequest valuationRequest = iValuationRequestRepository.findByProductId(productId);

        if (productOpt.isPresent()) {

            Product product = productOpt.get();

            List<ProductImage> productImages = IProductImageRepository.findByProduct(product);

            return ProductMapper.mapToProductDTO(product, productImages, valuationRequest);
        } else {
            // Handle the case where no Product with the given id is found
            throw new EntityNotFoundException("No Product found with id: " + productId);
        }


    }
    @Override
    public Map<String,String> ApproveFinalValuationRequest(Integer id) {
        // Find the ValuationRequest with the given id
        Optional<ValuationRequest> valuationRequestOpt = iValuationRequestRepository.findById(id);
        Map<String, String> response = new HashMap<>();
        if (valuationRequestOpt.isPresent()) {
            ValuationRequest valuationRequest = valuationRequestOpt.get();

            if(valuationRequest.getValuationStatus().equals(ValuationRequestStatus.PENDING_MANAGER_APPROVAL) ){
                valuationRequest.setValuationStatus(ValuationRequestStatus.MANAGER_APPROVED);
                iValuationRequestRepository.save(valuationRequest);
                response.put("message", "ValuationRequest with id: " + id + " has been approved by manager");
                return response;
            } else {
                response.put("message", "ValuationRequest with id: " + id + " is not in PENDING_MANAGER_APPROVAL status");
                return  response;
                // throw new IllegalArgumentException("ValuationRequest with id: " + id + " is not in PENDING_MANAGER_APPROVAL status");
            }

        } else {
            // Handle the case where no ValuationRequest with the given id is found
            // throw new EntityNotFoundException("No ValuationRequest found with id: " + id);
            response.put("message", "No ValuationRequest found with id: " + id);
            return  response;
        }

    }
    @Override
    public Map<String,String> CancelFinalValuationRequest(Integer id) {
        // Find the ValuationRequest with the given id
        Optional<ValuationRequest> valuationRequestOpt = iValuationRequestRepository.findById(id);
        Map<String, String> response = new HashMap<>();
        if (valuationRequestOpt.isPresent()) {

            ValuationRequest valuationRequest = valuationRequestOpt.get();

            if(valuationRequest.getValuationStatus().equals(ValuationRequestStatus.PENDING_MANAGER_APPROVAL) ){
                valuationRequest.setValuationStatus(ValuationRequestStatus.CANCELED);
                iValuationRequestRepository.save(valuationRequest);
                response.put("message", "ValuationRequest with id: " + id + " has been rejected by manager");
                return response;
            } else {
                response.put("message", "ValuationRequest with id: " + id + " is not in PENDING_MANAGER_APPROVAL status");
                return  response;
                // throw new IllegalArgumentException("ValuationRequest with id: " + id + " is not in PENDING_MANAGER_APPROVAL status");
            }

        } else {
            // Handle the case where no ValuationRequest with the given id is found
            // throw new EntityNotFoundException("No ValuationRequest found with id: " + id);
            response.put("message", "No ValuationRequest found with id: " + id);
            return  response;
        }
    }

    @Override
    public List<FinalValuationRequestDTO> getListManagerApproveValuationRequest() {
        return valuationRequestMapper.mapToFinalValuationRequestDTOList(
                iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.MANAGER_APPROVED));
    }


    @Override
    public List<Map<String,String>> sendFinalValuationToMember(Integer id) {
        // Find the ValuationRequest with the given id
        Optional<ValuationRequest> valuationRequestOpt = iValuationRequestRepository.findById(id);
        List<Map<String, String>> responseList = new ArrayList<>();
        Map<String, String> response = new HashMap<>();

        if (valuationRequestOpt.isPresent()) {
            ValuationRequest valuationRequest = valuationRequestOpt.get();

            if (valuationRequest.getValuationStatus().equals(ValuationRequestStatus.MANAGER_APPROVED)) {
                valuationRequest.setValuationStatus(ValuationRequestStatus.PENDING_MEMBER_ACCEPTANCE);
                iValuationRequestRepository.save(valuationRequest);

                Product product = valuationRequest.getProduct();

                Map<String, String> response1 = sendNotifyToMember(valuationRequest, product);

                // Add response1 to the response list
                responseList.add(response1);

                response.put("message", "ValuationRequest with id: " + id + " has been sent to member for acceptance");
                responseList.add(response);

                return responseList;
            } else {
                response.put("message", "ValuationRequest with id: " + id + " is "+valuationRequest.getValuationStatus()+" status");
                responseList.add(response);
                return responseList;
            }

        } else {
            // Handle the case where no ValuationRequest with the given id is found
            response.put("message", "No ValuationRequest found with id: " + id);
            responseList.add(response);
            return responseList;
        }
    }

    @Override
    public Map<String,String> sendNotifyToMember(ValuationRequest valuationRequest, Product product) {

        NotifyFinalValuationDTO notifyFinalValuationDTO = NotifyMapper.mapToNotifyFinalValuationDTO(product, valuationRequest);
        Notify notify = new Notify();
        notify.setTitle(notifyFinalValuationDTO.getTitle());
        notify.setDescription(notifyFinalValuationDTO.getDescriptionOfProduct());
        notify.setMember(valuationRequest.getMember());
        notify.setDate(LocalDate.now());
        iNotifyRepository.save(notify);
        Map<String, String> status = new HashMap<>();
        status.put("Status:", "Notify has been sent to member");
        return status;

    }
    @Override
    public List<ViewValuationRequestDTO> viewSentRequest(Integer memberId) {
        List<ValuationRequest> valuationRequests = iValuationRequestRepository.findByMemberId(memberId);
        return valuationRequestMapper.mapToViewValuationRequestDTOList(valuationRequests);
    }

    //Create Notify by specific format message
    private String createRequestTitle(ValuationRequest valuationRequest) {
        return "#" + valuationRequest.getId() + ": Your Valuation Request has been sent.";
    }
    private String createRequestMessage(ValuationRequest valuationRequest) {
        return "Your valuation request #"+ valuationRequest.getId() +" has been sent. Please wait for our response.";
    }
    private String productReceivedTitle(ValuationRequest valuationRequest) {
        return "#" + valuationRequest.getId() + ":Product Received #"+ valuationRequest.getId();
    }
    private String productReceivedMessage(ValuationRequest valuationRequest) {
        return "Your product has been received. We are processing the valuation. We will contact you as soon as your product is evaluated.";
    }
    private String preliminaryValuatedTitle(ValuationRequest valuationRequest) {
        return "#" + valuationRequest.getId() + " :Product Preliminary Valuated";
    }
    private String preliminaryValuatedMessage(ValuationRequest valuationRequest) {
        return "We have done the preliminary valuation for your product. We will contact you soon.";
    }
}
