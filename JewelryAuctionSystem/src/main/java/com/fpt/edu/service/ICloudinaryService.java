package com.fpt.edu.service;

import com.fpt.edu.config.CloudinaryConfig;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface ICloudinaryService {
    Map uploadFile(MultipartFile file) throws Exception;
    Map deleteFile(String publicId) throws Exception;
}
