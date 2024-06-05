package com.fpt.edu.service;

import com.fpt.edu.dto.ProductDTO;
import com.fpt.edu.dto.ResponseRequestValuationDTO;
import com.fpt.edu.dto.ValuationRequestDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.ProductMapper;
import com.fpt.edu.mapper.ResponseValuationRequestMapper;
import com.fpt.edu.repository.*;
import com.fpt.edu.status.ResponseValuationRequestStatus;
import com.fpt.edu.status.ValuationRequestStatus;
import com.fpt.edu.mapper.ValuationRequestMapper;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
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

    private final ValuationRequestMapper valuationRequestMapper;
    private final ProductMapper productMapper;
    private final ResponseValuationRequestMapper responseValuationRequestMapper;

    private final CloudinaryService cloudinaryService;
    private final INotifyService iNotifyService;
    private final IResponseRequestValuationService iResponseRequestValuationService;


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
    public List<ValuationRequestDTO> getRequestedValuationRequest() {
        return valuationRequestMapper.mapToValuationRequestDTOList(iValuationRequestRepository.findByValuationStatus(ValuationRequestStatus.REQUESTED));
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
    public Map<String,Object> getValuationResponse(Integer id) {
        Map<String, Object> map = new HashMap<>();
        ValuationRequest valuationRequest = iValuationRequestRepository.getReferenceById(id);
        List<ResponseRequestValuationDTO> responseRequestValuationDTOS = responseValuationRequestMapper.toResponseValuationRequestDTOList(iResponseRequestValuationRepository.findByValuationRequest(valuationRequest));
        if (valuationRequest.getProduct() == null) {
            map.put("productDTO", null);
            map.put("valuationRequestDTO", valuationRequestMapper.mapToValuationRequestDTO(valuationRequest));
            map.put("responseRequestValuationDTOS", responseRequestValuationDTOS);
            return map;
        }else {
            ProductDTO productDTO = productMapper.toProductDTO(valuationRequest.getProduct());
            map.put("productDTO", productDTO);
            map.put("valuationRequestDTO", valuationRequestMapper.mapToValuationRequestDTO(valuationRequest));
            map.put("responseRequestValuationDTOS", responseRequestValuationDTOS);
            return map;
        }
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
