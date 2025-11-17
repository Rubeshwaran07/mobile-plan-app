package com.mobileplan.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class ForgotPasswordRequest {
    @NotBlank
    private String emailOrMobile;
}
