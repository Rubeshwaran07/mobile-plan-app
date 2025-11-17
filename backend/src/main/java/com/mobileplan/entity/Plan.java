package com.mobileplan.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "plans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Addon> addons = List.of(); // ✅ initialize as empty
}

