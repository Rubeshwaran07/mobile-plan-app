package com.mobileplan.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;
    private String city;
    private String state;
    private String postalCode;

    private String paymentMethod;              // e.g., "Credit Card", "UPI", etc.
    private String notificationPreference;     // e.g., "EMAIL", "SMS", "PUSH"
    private Boolean notificationEnabled;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
}
