package com.mobileplan.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal totalAmount;

    private String paymentStatus; // "Done" or "Pending"

    private LocalDateTime orderDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    // Keep track of purchased plans
    @ManyToMany
    @JoinTable(
            name = "order_plans",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "plan_id")
    )
    private List<Plan> plans;

    // Keep track of purchased addons
    @ManyToMany
    @JoinTable(
            name = "order_addons",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "addon_id")
    )
    private List<Addon> addons;
}
