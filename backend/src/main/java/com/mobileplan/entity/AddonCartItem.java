package com.mobileplan.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "addon_cart_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddonCartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "addon_id", nullable = false)
    private Addon addon;

    private int quantity = 1;
}
