package com.fpt.edu.service;
import com.fpt.edu.dto.*;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.NotifyMapper;
import com.fpt.edu.repository.*;
import com.fpt.edu.status.ValuationRequestStatus;
import com.fpt.edu.mapper.ValuationRequestMapper;
import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.mapper.ResponseValuationRequestMapper;
import com.fpt.edu.status.ResponseValuationRequestStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ValuationRequestService implements IValuationRequestService{

    private final IValuationRequestRepository iValuationRequestRepository;
    private final IMemberRepository iMemberRepository;
    private final IValuationImageRepository iValuationImageRepository;
    private final IResponseRequestValuationRepository iResponseRequestValuationRepository;
    private final IStaffRepository iStaffRepository;
    private final INotifyRepository iNotifyRepository;

    private final ValuationRequestMapper valuationRequestMapper;
    private final ResponseValuationRequestMapper responseValuationRequestMapper;

    private final CloudinaryService cloudinaryService;
    private final NotifyMapper NotifyMapper;
    private final INotifyService iNotifyService;
    private final IResponseRequestValuationService iResponseRequestValuationService;
    private final ProductService productService;

    private final ResponseValuationRequestService responseValuationRequestService;


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
        iNotifyService.insertNotify(member, createRequestTitle(valuationRequest), createRequestMessage(valuationRequest));
        return valuationRequestDTO;
    }

    @Override
    public List<ValuationRequestDetailDTO> getRequestedValuationRequest() {
        List<ValuationRequest> valuationRequests = iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.REQUESTED);
        for (ValuationRequest valuationRequest : valuationRequests) {
            Set<ValuationImage> valuationImages = iValuationImageRepository.findByRequest(valuationRequest);
            valuationRequest.setValuationImages(valuationImages);
        }
        return valuationRequestMapper.mapToValuationRequestDetailDTOList(valuationRequests);
    }

    @Override
    public List<ValuationRequestDetailDTO> getPreliminaryValuationRequest() {
        List<ValuationRequest> valuationRequests = iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.PRELIMINARY_VALUATED);
        for (ValuationRequest valuationRequest : valuationRequests) {
            Set<ValuationImage> valuationImages = iValuationImageRepository.findByRequest(valuationRequest);
            valuationRequest.setValuationImages(valuationImages);
        }
        return valuationRequestMapper.mapToValuationRequestDetailDTOList(valuationRequests);
    }

    @Override
    public ValuationRequestDTO productReceived(Integer id) {
        ValuationRequest valuationRequest = iValuationRequestRepository.getReferenceById(id);
        valuationRequest.setValuationStatus(ValuationRequestStatus.PRODUCT_RECEIVED);
        Member member = iMemberRepository.getReferenceById(valuationRequestMapper.mapToValuationRequestDTO(valuationRequest).getMemberId());
        LocalDate createDate = LocalDate.now();
        iNotifyService.insertNotify(member, productReceivedTitle(valuationRequest), productReceivedMessage(valuationRequest));
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
        return null;
    }

    @Override
    public ValuationRequestDTO preliminaryValuation(Integer id, BigDecimal estimateMin, BigDecimal estimateMax, Integer staffId) {
        //create request
        ValuationRequest valuationRequest = iValuationRequestRepository.getReferenceById(id);
        valuationRequest.setValuationStatus(ValuationRequestStatus.PRELIMINARY_VALUATED);
        valuationRequest.setEstimatePriceMin(estimateMin);
        valuationRequest.setEstimatePriceMax(estimateMax);
        //create response
        Staff staff = iStaffRepository.getReferenceById(staffId);
        iResponseRequestValuationService.insertResponseRequestValuation(ResponseValuationRequestStatus.PRELIMINARY, estimateMin, estimateMax, staff, valuationRequest);
        //create notify
        Member member = valuationRequest.getMember();
        iNotifyService.insertNotify(member, preliminaryValuatedTitle(valuationRequest), preliminaryValuatedMessage(valuationRequest));
        return valuationRequestMapper.mapToValuationRequestDTO(iValuationRequestRepository.save(valuationRequest));
    }

    @Override
    public List<FinalValuationRequestDTO> getListFinalValuationRequest() {

        return valuationRequestMapper.mapToFinalValuationRequestDTOList(
                iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.PENDING_MANAGER_APPROVAL));
    }


    @Override
    public List<ViewValuationRequestDTO> viewSentRequest(Integer memberId) {
        List<ValuationRequest> valuationRequests = iValuationRequestRepository.findByMemberId(memberId);
        Map<ValuationRequest, Set<ValuationImage>> valuationRequestImagesMap = new HashMap<>();
        for(ValuationRequest valuationRequest : valuationRequests){
            Set<ValuationImage> valuationImage = iValuationImageRepository.findByRequest(valuationRequest);
            valuationRequestImagesMap.put(valuationRequest, valuationImage);
        }
        return valuationRequestMapper.mapToViewValuationRequestDTOList(valuationRequestImagesMap);
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
    public ProductDetailDTO getProductDetail(Integer id) {
        ValuationRequest valuationRequest = iValuationRequestRepository.getReferenceById(id);
        return productService.viewProductDetails(valuationRequest.getProduct().getId());
    }


    @Override
    public List<Map<String,String>> sendFinalValuationToMember(Integer id, Integer staffId) {
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

                responseValuationRequestService.insertResponseRequestValuation(
                        ResponseValuationRequestStatus.FINAL,
                        valuationRequest.getEstimatePriceMin(),
                        valuationRequest.getEstimatePriceMax(),
                        iStaffRepository.getReferenceById(staffId),
                        valuationRequest
                );

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
    public ViewDetailValuationRequestFinalApprovedDTO ViewDetailValuationRequestFinalApproved(Integer id) {
        ValuationRequest valuationRequest = iValuationRequestRepository.getReferenceById(id);
        Product product = valuationRequest.getProduct();
        return valuationRequestMapper.mapToViewDetailValuationRequestFinalApprovedDTO(valuationRequest, product);
    }

    //Create Notify by specific format message
    private String createRequestTitle(ValuationRequest valuationRequest) {
        return "#" + valuationRequest.getId() + ": Your Valuation Request has been sent.";
    }
    private String createRequestMessage(ValuationRequest valuationRequest) {
        return "Your valuation request #"+ valuationRequest.getId() +" has been sent. Please wait for our response.";
    }
    private String productReceivedTitle(ValuationRequest valuationRequest) {
        return "#" + valuationRequest.getId() + ": Product Received";
    }
    private String productReceivedMessage(ValuationRequest valuationRequest) {
        return "Your product has been received. We are processing the valuation. We will contact you as soon as your product is evaluated.";
    }
    private String preliminaryValuatedTitle(ValuationRequest valuationRequest) {
        return "#" + valuationRequest.getId() + ": Product Preliminary Valuated";
    }
    private String preliminaryValuatedMessage(ValuationRequest valuationRequest) {
        return "We have done the preliminary valuation for your product. We will contact you soon.";
    }


}
