package com.mobileplan.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "addon_purchases")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddonPurchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // the customer who purchased it

    @ManyToOne
    @JoinColumn(name = "addon_id")
    private Addon addon;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    private Instant purchasedAt = Instant.now();
}
