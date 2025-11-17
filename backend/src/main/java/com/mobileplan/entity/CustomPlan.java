package com.mobileplan.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "custom_plans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // generated name or user provided
    private Integer dataMB;
    private Integer voiceMinutes;
    private Integer smsCount;
    private Boolean roamingIncluded;
    private BigDecimal price; // computed by pricing engine

    private Instant createdAt = Instant.now();
    private String createdBy; // customer id or email (optional)
}
