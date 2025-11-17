package com.mobileplan.dto;

import com.mobileplan.entity.Addon;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanDTO {
    private Long id;
    private String name;
    private String type;
    private String description;
    private Integer validityDays;
    private Integer dataMB;
    private Integer voiceMinutes;
    private Integer smsCount;
    private Boolean roamingIncluded;
    private BigDecimal price;
}
