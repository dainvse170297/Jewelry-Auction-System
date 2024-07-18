package com.fpt.edu.service;

import com.fpt.edu.dto.*;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.LotMapper;
import com.fpt.edu.mapper.NotifyMapper;
import com.fpt.edu.repository.*;
import com.fpt.edu.status.ValuationRequestStatus;
import com.fpt.edu.mapper.ValuationRequestMapper;
import com.fpt.edu.status.ResponseValuationRequestStatus;
import com.fpt.edu.utils.MessageProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.fpt.edu.status.NotifyType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ValuationRequestService implements IValuationRequestService {

    private final int PAGE_SIZE = 10;

    private final IValuationRequestRepository iValuationRequestRepository;
    private final IMemberRepository iMemberRepository;
    private final IValuationImageRepository iValuationImageRepository;
    private final IStaffRepository iStaffRepository;
    private final INotifyRepository iNotifyRepository;
    private final ILotRepository iLotRepository;

    private final ValuationRequestMapper valuationRequestMapper;

    private final CloudinaryService cloudinaryService;
    private final NotifyMapper NotifyMapper;
    private final INotifyService iNotifyService;
    private final IResponseRequestValuationService iResponseRequestValuationService;

    private final ResponseValuationRequestService responseValuationRequestService;
    private final LotMapper lotMapper;


    @Override
    public ValuationRequestDetailDTO create(Integer memberId, String description, BigDecimal memberEstimatePrice, Set<MultipartFile> files) {
        ValuationRequest valuationRequest = new ValuationRequest();
        //set request
        Member member = iMemberRepository.getReferenceById(memberId);
        System.out.println("Member: " + member);
        valuationRequest.setMember(member);
        valuationRequest.setDescription(description);
        valuationRequest.setTimeRequest(LocalDateTime.now());
        if (memberEstimatePrice == null) {
            memberEstimatePrice = new BigDecimal(-1);
        }
        valuationRequest.setMemberEstimatePrice(memberEstimatePrice);
        valuationRequest.setValuationStatus(ValuationRequestStatus.REQUESTED);
        valuationRequest.setProduct(null);
        iValuationRequestRepository.save(valuationRequest);
        List<String> valuationImages = new ArrayList<>();
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
            valuationImages.add(image.get("url").toString());
            iValuationImageRepository.save(valuationImage);
        }

        ValuationRequestDetailDTO valuationRequestDTO = valuationRequestMapper.mapToValuationRequestDetailDTO(valuationRequest);
        valuationRequestDTO.setValuationImagesUrls(valuationImages);
        //set notify
        iNotifyService.insertNotify(member, MessageProvider.ValuationRequestService.valuationRequestSuccessTitle,
                MessageProvider.ValuationRequestService.valuationRequestSuccessDescription,
                NotifyType.VALUATION_REQUEST_SUCCESS, valuationRequest.getId());
        return valuationRequestDTO;
    }

    @Override
    public List<ValuationRequestDetailDTO> getAll() {
        List<ValuationRequest> valuationRequests = iValuationRequestRepository.findAll();
        for (ValuationRequest valuationRequest : valuationRequests) {
            List<ValuationImage> valuationImages = iValuationImageRepository.findByRequest(valuationRequest);
            valuationRequest.setValuationImages(valuationImages);
        }
        return valuationRequestMapper.mapToValuationRequestDetailDTOList(valuationRequests);
    }

    @Override
    public List<ValuationRequestDetailDTO> getRequestedValuationRequest() {
        List<ValuationRequest> valuationRequests = iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.REQUESTED);
        for (ValuationRequest valuationRequest : valuationRequests) {
            List<ValuationImage> valuationImages = iValuationImageRepository.findByRequest(valuationRequest);
            valuationRequest.setValuationImages(valuationImages);
        }
        return valuationRequestMapper.mapToValuationRequestDetailDTOList(valuationRequests);
    }

    @Override
    public List<ValuationRequestDetailDTO> getPreliminaryValuationRequest() {
        List<ValuationRequest> valuationRequests = iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.PRELIMINARY_VALUATED);
        for (ValuationRequest valuationRequest : valuationRequests) {
            List<ValuationImage> valuationImages = iValuationImageRepository.findByRequest(valuationRequest);
            valuationRequest.setValuationImages(valuationImages);
        }
        return valuationRequestMapper.mapToValuationRequestDetailDTOList(valuationRequests);
    }

    @Override
    public ValuationRequestDetailDTO productReceived(Integer id) {
        ValuationRequest valuationRequest = iValuationRequestRepository.getReferenceById(id);
        valuationRequest.setValuationStatus(ValuationRequestStatus.PRODUCT_RECEIVED);
        Member member = iMemberRepository.getReferenceById(valuationRequestMapper.mapToValuationRequestDTO(valuationRequest).getMemberId());
        LocalDateTime createDate = LocalDateTime.now();
        // Send notify to member
        iNotifyService.insertNotify(member, MessageProvider.ValuationRequestService.productReceivedTitle,
            MessageProvider.ValuationRequestService.productReceivedMessage
            ,NotifyType.VALUATION_REQUEST_PRODUCT_RECEIVED, valuationRequest.getId());
        iValuationRequestRepository.save(valuationRequest);
        valuationRequest.setValuationImages(iValuationImageRepository.findByRequest(valuationRequest));
        ValuationRequestDetailDTO dto = valuationRequestMapper.mapToValuationRequestDetailDTO(valuationRequest);
        return dto;
    }

    @Override
    public List<ValuationRequestDetailDTO> getRequestStatusProductReceived() {
        List<ValuationRequest> valuationRequests = iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.PRODUCT_RECEIVED);
        for (ValuationRequest valuationRequest : valuationRequests) {
            List<ValuationImage> valuationImages = iValuationImageRepository.findByRequest(valuationRequest);
            valuationRequest.setValuationImages(valuationImages);
        }
        List<ValuationRequestDetailDTO> result = valuationRequestMapper.mapToValuationRequestDetailDTOList(valuationRequests);
        System.out.println("Result: ");
        for (ValuationRequestDetailDTO dto : result) {
            System.out.println(dto);
        }
        return result;
    }

    @Override
    public ValuationRequestDetailDTO getRequestByIdAndStatusProductReceived(int id) {
        ValuationRequest valuationRequest = iValuationRequestRepository.findByIdAndValuationStatus(id, ValuationRequestStatus.PRODUCT_RECEIVED);
        List<ValuationImage> valuationImages = iValuationImageRepository.findByRequest(valuationRequest);
        valuationRequest.setValuationImages(valuationImages);
        return valuationRequestMapper.mapToValuationRequestDetailDTO(valuationRequest);
    }

    @Override
    public ValuationRequestDetailDTO preliminaryValuation(Integer id, BigDecimal estimateMin, BigDecimal estimateMax, Integer staffId) {
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
        iNotifyService.insertNotify(member, MessageProvider.ValuationRequestService.preliminaryValuatedTitle,
                MessageProvider.ValuationRequestService.preliminaryValuatedMessage,
                NotifyType.VALUATION_REQUEST_PRELIMINARY, valuationRequest.getId());
        iValuationRequestRepository.save(valuationRequest);
        valuationRequest.setValuationImages(iValuationImageRepository.findByRequest(valuationRequest));
        return valuationRequestMapper.mapToValuationRequestDetailDTO(valuationRequest);
    }

    @Override
    public List<FinalValuationRequestDTO> getListFinalValuationRequest() {

        return valuationRequestMapper.mapToFinalValuationRequestDTOList(
                iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.PENDING_MANAGER_APPROVAL));
    }

    @Override
    public List<ViewValuationRequestDTO> viewSentRequest(Integer memberId) {
        List<ValuationRequest> valuationRequests = iValuationRequestRepository.findByMemberId(memberId);
        Map<ValuationRequest, List<ValuationImage>> valuationRequestImagesMap = new HashMap<>();
        for (ValuationRequest valuationRequest : valuationRequests) {
            List<ValuationImage> valuationImage = iValuationImageRepository.findByRequest(valuationRequest);
            valuationRequestImagesMap.put(valuationRequest, valuationImage);
        }
        return valuationRequestMapper.mapToViewValuationRequestDTOList(valuationRequestImagesMap);
    }

    @Override
    public Map<String, String> ApproveFinalValuationRequest(Integer id) {
        // Find the ValuationRequest with the given id
        Optional<ValuationRequest> valuationRequestOpt = iValuationRequestRepository.findById(id);
        Map<String, String> response = new HashMap<>();
        if (valuationRequestOpt.isPresent()) {
            ValuationRequest valuationRequest = valuationRequestOpt.get();

            if (valuationRequest.getValuationStatus().equals(ValuationRequestStatus.PENDING_MANAGER_APPROVAL)) {
                valuationRequest.setValuationStatus(ValuationRequestStatus.MANAGER_APPROVED);
                iValuationRequestRepository.save(valuationRequest);
                response.put("message", "ValuationRequest with id: " + id + " has been approved by manager");
                return response;
            } else {
                response.put("message", "ValuationRequest with id: " + id + " is not in PENDING_MANAGER_APPROVAL status");
                return response;
                // throw new IllegalArgumentException("ValuationRequest with id: " + id + " is not in PENDING_MANAGER_APPROVAL status");
            }
        } else {
            // Handle the case where no ValuationRequest with the given id is found
            // throw new EntityNotFoundException("No ValuationRequest found with id: " + id);
            response.put("message", "No ValuationRequest found with id: " + id);
            return response;
        }
    }

    @Override
    public Map<String, String> CancelFinalValuationRequest(Integer id) {
        // Find the ValuationRequest with the given id
        Optional<ValuationRequest> valuationRequestOpt = iValuationRequestRepository.findById(id);
        Map<String, String> response = new HashMap<>();
        if (valuationRequestOpt.isPresent()) {

            ValuationRequest valuationRequest = valuationRequestOpt.get();

            if (valuationRequest.getValuationStatus().equals(ValuationRequestStatus.PENDING_MANAGER_APPROVAL)) {
                valuationRequest.setValuationStatus(ValuationRequestStatus.PRODUCT_RECEIVED);
                iValuationRequestRepository.save(valuationRequest);
                response.put("message", "ValuationRequest with id: " + id + " has been rejected by manager");
                return response;
            } else {
                response.put("message", "ValuationRequest with id: " + id + " is not in PENDING_MANAGER_APPROVAL status");
                return response;
                // throw new IllegalArgumentException("ValuationRequest with id: " + id + " is not in PENDING_MANAGER_APPROVAL status");
            }

        } else {
            // Handle the case where no ValuationRequest with the given id is found
            // throw new EntityNotFoundException("No ValuationRequest found with id: " + id);
            response.put("message", "No ValuationRequest found with id: " + id);
            return response;
        }
    }

    @Override
    public List<FinalValuationRequestDTO> getListManagerApproveValuationRequest() {


        return valuationRequestMapper.mapToFinalValuationRequestDTOList(
                iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.MANAGER_APPROVED));
    }

    @Override
    public LotDTO getProductDetail(Integer id) {
        Integer productId = iValuationRequestRepository.getReferenceById(id).getProduct().getId();
        LotDTO result = null;
        List<Lot> lots = iLotRepository.findLotByProduct_Id(productId);
        if (!lots.isEmpty()) {
            Lot lot = lots.get(0);
            result = lotMapper.toLotDTO(lot);
        }
        return result;
//        return productService.viewProductDetails(valuationRequest.getProduct().getId());
    }

    @Override
    public List<Map<String, String>> sendFinalValuationToMember(Integer id) {
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
                        iStaffRepository.getReferenceById(1),
                        valuationRequest
                );
                // Send notify to member
                iNotifyService.insertNotify(valuationRequest.getMember(), MessageProvider.ValuationRequestService.finalValuatedTitle,
                        MessageProvider.ValuationRequestService.finalValuatedMessage,
                        NotifyType.FINAL_VALUATION, valuationRequest.getId());
                return responseList;
            } else {
                response.put("message", "ValuationRequest with id: " + id + " is " + valuationRequest.getValuationStatus() + " status");
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
    public Map<String, String> sendNotifyToMember(ValuationRequest valuationRequest, Product product) {

//        NotifyFinalValuationDTO notifyFinalValuationDTO = NotifyMapper.mapToNotifyFinalValuationDTO(product, valuationRequest);
//        Notify notify = new Notify();
//        notify.setTitle(notifyFinalValuationDTO.getTitle());
//        notify.setDescription(notifyFinalValuationDTO.getDescriptionOfProduct());
//        notify.setMember(valuationRequest.getMember());
//        notify.setDate(LocalDateTime.now());
//        iNotifyRepository.save(notify);
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

    @Override
    public Boolean cancelValuationRequest(Integer id) {
        Boolean result = false;
        try {
            ValuationRequest valuationRequest = iValuationRequestRepository.getReferenceById(id);
            if (valuationRequest.getValuationStatus().equals(ValuationRequestStatus.PRODUCT_RECEIVED)
                    || valuationRequest.getValuationStatus().equals(ValuationRequestStatus.PRELIMINARY_VALUATED)
                    || valuationRequest.getValuationStatus().equals(ValuationRequestStatus.REQUESTED)) {
                valuationRequest.setValuationStatus(ValuationRequestStatus.CANCELED);
                iValuationRequestRepository.save(valuationRequest);
                // Send notify to member
                iNotifyService.insertNotify(valuationRequest.getMember(),
                        MessageProvider.ValuationRequestService.cancelValuationRequestTitle,
                        MessageProvider.ValuationRequestService.cancelValuationRequestMessage,
                        NotifyType.VALUATION_REQUEST_CANCEL, valuationRequest.getId());
                result = true;
            }
        } catch (Exception e) {
            result = false;
        }
        return result;
    }

    @Override
    public Boolean cancelValuationRequestByStaff(Integer id) {
        ValuationRequest valuationRequest = iValuationRequestRepository.getReferenceById(id);
        if (valuationRequest.getValuationStatus().equals(ValuationRequestStatus.REQUESTED)) {
            return cancelValuationRequest(id);
        }
        return false;
    }

    @Override
    public ValuationRequestDetailDTO getValuationRequestDetail(Integer id) {
        ValuationRequest valuationRequest = iValuationRequestRepository.getReferenceById(id);
        List<ValuationImage> valuationImage = iValuationImageRepository.findByRequest(valuationRequest);
        valuationRequest.setValuationImages(valuationImage);
        return valuationRequestMapper.mapToValuationRequestDetailDTO(valuationRequest);
    }

    //auto cancel valuation request that has been preliminary valuated for 30 days
    @Scheduled(fixedRate = 1000 * 60 * 60 * 24) // 1 day
    public void autoCancelValuationRequest() {
        List<ValuationRequest> valuationRequests = iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.PRELIMINARY_VALUATED);
        for (ValuationRequest valuationRequest : valuationRequests) {
            if (LocalDateTime.now().isAfter(valuationRequest.getTimeRequest().plusDays(30))) {
                valuationRequest.setValuationStatus(ValuationRequestStatus.CANCELED);
                iValuationRequestRepository.save(valuationRequest);
                iNotifyService.insertNotify(valuationRequest.getMember(),
                        MessageProvider.ValuationRequestService.timeoutPreliminaryValuatedTitle,
                        MessageProvider.ValuationRequestService.timeoutPreliminaryValuatedMessage,
                        NotifyType.VALUATION_REQUEST_CANCEL, valuationRequest.getId());
            }
        }
    }
}