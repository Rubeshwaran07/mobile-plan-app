package com.mobileplan.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class OtpVerifyRequest {
    @NotBlank
    private String mobile;
    @NotBlank
    private String otp;
}
