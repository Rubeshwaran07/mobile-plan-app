package com.mobileplan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {
    private String address;
    private String city;
    private String state;
    private String postalCode;
    private String paymentMethod;
    private String notificationPreference;
    private Boolean notificationEnabled;
}
