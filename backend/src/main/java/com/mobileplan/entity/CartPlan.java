package com.mobileplan.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart_plans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;
}
