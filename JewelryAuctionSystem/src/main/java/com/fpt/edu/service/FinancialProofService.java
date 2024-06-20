package com.fpt.edu.service;

import com.fpt.edu.dto.FinancialProofRequestDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.FinancialProofRequestMapper;
import com.fpt.edu.repository.IFinancialProofImageRepository;
import com.fpt.edu.repository.IFinancialProofRequestRepository;
import com.fpt.edu.repository.IMemberRepository;
import com.fpt.edu.status.AuctionRegisterStatus;
import com.fpt.edu.status.FinancialProofRequestStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class FinancialProofService implements IFinancialProofService {

    private final IMemberRepository iMemberRepository;
    private final CloudinaryService cloudinaryService;
    private final IFinancialProofRequestRepository iFinancialProofRequestRepository;
    private final IFinancialProofImageRepository iFinancialProofImageRepository;
    private final FinancialProofRequestMapper financialProofRequestMapper;


    @Override
    public ResponseEntity<String> checkAvailableFinancialProofRequest(Integer memberId) {

        Member member = iMemberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("Member not found"));
        Set<AuctionRegister> auctionRegisters = member.getAuctionRegisters();
        List<FinancialProofRequest> financialProofRequests = iFinancialProofRequestRepository.findByMember(member);

        for (FinancialProofRequest financialProofRequest : financialProofRequests) {
            if (financialProofRequest.getStatus().equals(FinancialProofRequestStatus.REQUESTED)) {
                return ResponseEntity.badRequest().body("You have already requested for financial proof");
            }
        }
        for (AuctionRegister auctionRegister : auctionRegisters) {

            if (auctionRegister.getStatus().equals(AuctionRegisterStatus.PENDING_PAYMENT)) {
                return ResponseEntity.badRequest().body("You have pending payment");
            }
        }
        return ResponseEntity.ok().body("You can request for financial proof");
    }


    @Override
    public FinancialProofRequestDTO createFinancialProofRequest(Integer memberId,
                                                                Set<MultipartFile> files) {

        Member member = iMemberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("Member not found"));
        FinancialProofRequestStatus status = FinancialProofRequestStatus.REQUESTED;
        FinancialProofRequest financialProofRequest = new FinancialProofRequest();
        financialProofRequest.setStatus(status);
        financialProofRequest.setMember(member);
        financialProofRequest.setStaff(null);
        financialProofRequest.setFinancialProofAmount(new BigDecimal(-1));
        iFinancialProofRequestRepository.save(financialProofRequest);
        Set<String> listFinancialProofImages = new HashSet<>();
        for (MultipartFile file : files) {
            Map image;
            try {
                image = cloudinaryService.uploadFile(file);

            } catch (Exception e) {
                throw new RuntimeException("Failed to upload file");
            }
            FinancialProofImage financialProofImage = new FinancialProofImage();
            financialProofImage.setImageUrl((String) image.get("url"));
            financialProofImage.setFinancialProofRequest(financialProofRequest);
            financialProofImage.setDefaultImage("http://example.com/images/default.jpg");
            iFinancialProofImageRepository.save(financialProofImage);
            listFinancialProofImages.add((String) image.get("url"));
        }

        FinancialProofRequestDTO financialProofRequestDTO = financialProofRequestMapper
                .mapToFinancialProofRequestDTO(financialProofRequest);
        financialProofRequestDTO.setFinancialProofImages(listFinancialProofImages);
        return financialProofRequestDTO;
    }

    @Override
    public Set<FinancialProofRequestDTO> getAllFinancialProofRequest() {

        List<FinancialProofRequest> financialProofRequests = iFinancialProofRequestRepository.findAllWithImages();
        Set<FinancialProofRequestDTO> financialProofRequestDTOS = new HashSet<>();
        for (FinancialProofRequest financialProofRequest : financialProofRequests) {
            FinancialProofRequestDTO financialProofRequestDTO = financialProofRequestMapper.mapToFinancialProofRequestDTO(financialProofRequest);
            financialProofRequestDTO.setFinancialProofImages(financialProofRequestMapper.mapToFinancialProofImageUrls(financialProofRequest.getFinancialProofImages()));
            financialProofRequestDTOS.add(financialProofRequestDTO);
        }
        return financialProofRequestDTOS;
    }

    @Override
    public FinancialProofRequestDTO getFinancialProofRequestById(Integer id) {
        FinancialProofRequest financialProofRequest = iFinancialProofRequestRepository
                .findByIdWithImages(id).orElseThrow(() -> new RuntimeException("Financial proof request not found"));

        FinancialProofRequestDTO financialProofRequestDTO = financialProofRequestMapper.mapToFinancialProofRequestDTO(financialProofRequest);
        financialProofRequestDTO.setFinancialProofImages(financialProofRequestMapper.mapToFinancialProofImageUrls(financialProofRequest.getFinancialProofImages()));
        return financialProofRequestDTO;
    }

   @Override
    public FinancialProofRequestDTO updateFinancialProofRequest(Integer idRq, Integer staffId, BigDecimal financialProofAmount) {
        FinancialProofRequest financialProofRequest = iFinancialProofRequestRepository
                .findById(idRq).orElseThrow(() -> new RuntimeException("Financial proof request not found"));
        Staff staff = new Staff();
        staff.setId(staffId);
        financialProofRequest.setStaff(staff);
        financialProofRequest.setFinancialProofAmount(financialProofAmount);
        financialProofRequest.setStatus(FinancialProofRequestStatus.AVAILABLE);
        iFinancialProofRequestRepository.save(financialProofRequest);
        return financialProofRequestMapper.mapToFinancialProofRequestDTO(financialProofRequest);
    }

    @Override
    public FinancialProofRequestDTO rejectFinancialProofRequest(Integer idRq, Integer staffId) {
        FinancialProofRequest financialProofRequest = iFinancialProofRequestRepository
                .findById(idRq).orElseThrow(() -> new RuntimeException("Financial proof request not found"));
        Staff staff = new Staff();
        staff.setId(staffId);
        financialProofRequest.setStaff(staff);
        financialProofRequest.setStatus(FinancialProofRequestStatus.REJECTED);
        iFinancialProofRequestRepository.save(financialProofRequest);
        return financialProofRequestMapper.mapToFinancialProofRequestDTO(financialProofRequest);
    }

}
