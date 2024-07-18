package com.fpt.edu.service;

import com.fpt.edu.dto.FinancialProofRequestDTO;
import com.fpt.edu.entity.*;
import com.fpt.edu.mapper.FinancialProofRequestMapper;
import com.fpt.edu.repository.*;
import com.fpt.edu.status.AuctionRegisterStatus;
import com.fpt.edu.status.FinancialProofRequestStatus;
import com.fpt.edu.status.NotifyType;
import com.fpt.edu.utils.MessageProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FinancialProofService implements IFinancialProofService {

    private static final Logger log = LoggerFactory.getLogger(FinancialProofService.class);
    private final IMemberRepository iMemberRepository;
    private final CloudinaryService cloudinaryService;
    private final IFinancialProofRequestRepository iFinancialProofRequestRepository;
    private final IFinancialProofImageRepository iFinancialProofImageRepository;
    private final FinancialProofRequestMapper financialProofRequestMapper;
    private final IAccountRepository iAccountRepository;
    private final IManagerRepository iManagerRepository;
    private final INotifyService iNotifyService;
    private final BigDecimal FINANCIAL_VIP = new BigDecimal(100000); // dolar


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
        financialProofRequest.setTimeRequest(LocalDateTime.now());
        financialProofRequest.setMember(member);
        financialProofRequest.setStaff(null);
        financialProofRequest.setFinancialProofAmount(new BigDecimal(0));
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
    public Page<FinancialProofRequestDTO> getAllFinancialProofRequests(FinancialProofRequestStatus status, Pageable pageable) {
        Page<FinancialProofRequest> financialProofRequests = iFinancialProofRequestRepository.findByStatus(status, pageable);
        return financialProofRequests.map(financialProofRequestMapper::mapToFinancialProofRequestDTO);
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
    public FinancialProofRequestDTO updateFinancialProofRequest(Integer idRq, Integer Id, BigDecimal financialProofAmount, String role) {
        FinancialProofRequest financialProofRequest = iFinancialProofRequestRepository
                .findById(idRq).orElseThrow(() -> new RuntimeException("Financial proof request not found"));

        if(role.equals("STAFF")){
                Staff staff = new Staff();
                staff.setId(Id);
                financialProofRequest.setStaff(staff);
            }

        if(role.equals("MANAGER")){
                Manager manager = new Manager();
                manager.setId(Id);
                financialProofRequest.setManager(manager);
            }

        financialProofRequest.setFinancialProofAmount(financialProofAmount);
        log.info("Financial proof amount: {}", financialProofAmount);
        log.info("FINANCIAL_VIP: {}", FINANCIAL_VIP);

        if(financialProofAmount.compareTo(BigDecimal.ZERO) < 0){
            throw new RuntimeException("Financial proof amount must be greater than 0");
        }

        if(financialProofAmount.compareTo(FINANCIAL_VIP) >= 0){
            financialProofRequest.setStatus(FinancialProofRequestStatus.PENDING_MANAGER_APPROVAL);
        }else{
            financialProofRequest.setStatus(FinancialProofRequestStatus.AVAILABLE);
            Member member = financialProofRequest.getMember();
            member.setFinancialProofAmount(financialProofAmount);
            List<FinancialProofRequest> financialProofRequests =
                    iFinancialProofRequestRepository.findByMember(financialProofRequest.getMember());
            for (FinancialProofRequest financialProofRequest1 : financialProofRequests) {
                if(financialProofRequest1.getStatus().equals(FinancialProofRequestStatus.AVAILABLE)
                        && financialProofRequest1.getId() != financialProofRequest.getId()){
                    financialProofRequest1.setStatus(FinancialProofRequestStatus.CANCELED);
                    iFinancialProofRequestRepository.save(financialProofRequest1);
                }
            }
            //send notification for member
            iNotifyService.insertNotify(member,
                    MessageProvider.FinancialProofService.financialProofRequestApprovedTitle,
                    MessageProvider.FinancialProofService.financialProofRequestApprovedDescription(financialProofRequest.getTimeRequest()),
                    NotifyType.FINANCIAL_APPROVED, financialProofRequest.getId());
        }
        iFinancialProofRequestRepository.save(financialProofRequest);
        return financialProofRequestMapper.mapToFinancialProofRequestDTO(financialProofRequest);
    }

    @Override
    public FinancialProofRequestDTO rejectFinancialProofRequest(Integer idRq, Integer staffId, String userRole) {
        FinancialProofRequest financialProofRequest = iFinancialProofRequestRepository
                .findById(idRq).orElseThrow(() -> new RuntimeException("Financial proof request not found"));

        if(userRole.equals("STAFF")){
            Staff staff = new Staff();
            staff.setId(staffId);
            financialProofRequest.setStaff(staff);
        }
        if(userRole.equals("MANAGER")){
            Manager manager = new Manager();
            manager.setId(staffId);
            financialProofRequest.setManager(manager);
        }

        financialProofRequest.setStatus(FinancialProofRequestStatus.REJECTED);
        iFinancialProofRequestRepository.save(financialProofRequest);
        Member member = financialProofRequest.getMember();
        iNotifyService.insertNotify(member,
                MessageProvider.FinancialProofService.financialProofRequestRejectedTitle,
                MessageProvider.FinancialProofService.financialProofRequestRejectedDescription(financialProofRequest.getTimeRequest()),
                NotifyType.FINANCIAL_REJECTED, financialProofRequest.getId());
        return financialProofRequestMapper.mapToFinancialProofRequestDTO(financialProofRequest);
    }

    @Override
    public List<FinancialProofRequestDTO> getPendingApproval() {
        List<FinancialProofRequest> financialProofRequests = iFinancialProofRequestRepository.findByStatus(FinancialProofRequestStatus.PENDING_MANAGER_APPROVAL);
        List<FinancialProofRequestDTO> financialProofRequestDTOS = new ArrayList<>();

        for (FinancialProofRequest financialProofRequest : financialProofRequests) {
            FinancialProofRequestDTO financialProofRequestDTO = financialProofRequestMapper.mapToFinancialProofRequestDTO(financialProofRequest);
            financialProofRequestDTO.setFinancialProofImages(financialProofRequestMapper.mapToFinancialProofImageUrls(financialProofRequest.getFinancialProofImages()));
            financialProofRequestDTOS.add(financialProofRequestDTO);
        }
        return financialProofRequestDTOS;
    }

    @Override
    public FinancialProofRequestDTO confirmVip(Integer idRq, Integer managerId, boolean confirm) {
        FinancialProofRequest financialProofRequest = iFinancialProofRequestRepository
                .findById(idRq).orElseThrow(() -> new RuntimeException("Financial proof request not found"));
        Manager manager = new Manager();
        manager.setId(managerId);
        financialProofRequest.setManager(manager);
        if(confirm){
            financialProofRequest.setStatus(FinancialProofRequestStatus.AVAILABLE);
            Member member = financialProofRequest.getMember();
            member.setFinancialProofAmount(financialProofRequest.getFinancialProofAmount());

            List<FinancialProofRequest> financialProofRequests =
                    iFinancialProofRequestRepository.findByMember(financialProofRequest.getMember());
            for (FinancialProofRequest financialProofRequest1 : financialProofRequests) {
                if(financialProofRequest1.getStatus().equals(FinancialProofRequestStatus.AVAILABLE)
                        && financialProofRequest1.getId() != financialProofRequest.getId()){
                    financialProofRequest1.setStatus(FinancialProofRequestStatus.CANCELED);
                    iFinancialProofRequestRepository.save(financialProofRequest1);
                }
            }

        }else{
            financialProofRequest.setStatus(FinancialProofRequestStatus.REJECTED);
        }
        iFinancialProofRequestRepository.save(financialProofRequest);
        Member member = financialProofRequest.getMember();
        iNotifyService.insertNotify(member,
                MessageProvider.FinancialProofService.financialProofRequestApprovedTitle,
                MessageProvider.FinancialProofService.financialProofRequestApprovedDescription(financialProofRequest.getTimeRequest()),
                NotifyType.FINANCIAL_APPROVED, financialProofRequest.getId());
        return financialProofRequestMapper.mapToFinancialProofRequestDTO(financialProofRequest);
    }

}
