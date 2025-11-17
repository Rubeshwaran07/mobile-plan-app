package com.mobileplan.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class RegisterRequest {
    @NotBlank @Email
    private String email;

    @NotBlank
    private String mobile;

    @NotBlank @Size(min = 6, max = 100)
    private String password;

    private String name;
    private String address;
}
