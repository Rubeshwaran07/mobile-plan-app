package com.mobileplan.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "payment_methods")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PaymentMethod {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // CreditCard/UPI/Wallet
    private String label; // e.g., "My Visa ****1234"
    private String token; // masked or tokenized data (do NOT store raw card in prod)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
