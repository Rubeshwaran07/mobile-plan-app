package com.mobileplan.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart_addons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartAddon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "addon_id")
    private Addon addon;
}
