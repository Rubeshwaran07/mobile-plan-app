package com.mobileplan.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomizeRequest {
    private String name;
    private Integer dataMB;
    private Integer voiceMinutes;
    private Integer smsCount;
    private Boolean roamingIncluded;
    private String createdBy; // optional
}
