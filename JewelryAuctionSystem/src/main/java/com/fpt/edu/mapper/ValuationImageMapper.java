package com.fpt.edu.mapper;

import com.fpt.edu.dto.ValuationImageDTO;
import com.fpt.edu.entity.ValuationImage;
import com.fpt.edu.repository.IValuationImageRepository;
import com.fpt.edu.repository.IValuationRequestRepository;
import org.springframework.stereotype.Component;
import java.util.stream.Collectors;
import java.util.Set;

@Component
public class ValuationImageMapper {
    private IValuationRequestRepository iValuationRequestRepository;
    private IValuationImageRepository iValuationImageRepository;
    public ValuationImageDTO toValuationImageDTO(ValuationImage valuationImage) {
        ValuationImageDTO valuationImageDTO = new ValuationImageDTO();
        valuationImageDTO.setId(valuationImage.getId());
        valuationImageDTO.setRequestId(valuationImage.getRequest().getId());
        valuationImageDTO.setImageUrl(valuationImage.getImageUrl());
        return valuationImageDTO;
    }
    public ValuationImage toValuationImage(ValuationImageDTO valuationImageDTO) {
        ValuationImage valuationImage = new ValuationImage();
        valuationImage.setId(valuationImageDTO.getId());
        valuationImage.setRequest(iValuationRequestRepository.getReferenceById(valuationImageDTO.getRequestId()));
        valuationImage.setImageUrl(valuationImageDTO.getImageUrl());
        return valuationImage;
    }

    public Set<ValuationImageDTO> mapToValuationImageDTOList(Set<ValuationImage> valuationImages) {
        return valuationImages.stream().map(this::toValuationImageDTO).collect(Collectors.toSet());
    }

    public Set<Integer> mapToValuationImageIdList(Set<ValuationImage> valuationImages) {
        return valuationImages.stream().map(ValuationImage::getId).collect(Collectors.toSet());
    }

    public Set<String> toValuationImageUrls(Set<ValuationImage> valuationImages) {
        return valuationImages.stream().map(ValuationImage::getImageUrl).collect(Collectors.toSet());
    }

    public Set<ValuationImage> mapIdToValuationImageList(Set<Integer> valuationImageIds) {
        return valuationImageIds.stream().map(iValuationImageRepository::getReferenceById).collect(Collectors.toSet());
    }

    public Set<ValuationImage> mapToValuationImageList(Set<ValuationImageDTO> valuationImageDTOS) {
        return valuationImageDTOS.stream().map(this::toValuationImage).collect(Collectors.toSet());
    }
}
