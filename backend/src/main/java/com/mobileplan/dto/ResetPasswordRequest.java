package com.mobileplan.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class ResetPasswordRequest {
    @NotBlank
    private String token; // token we issued earlier
    @NotBlank
    private String newPassword;
}
