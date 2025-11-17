package com.mobileplan.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "addons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Addon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    @JsonIgnore
    private Plan plan;
}
