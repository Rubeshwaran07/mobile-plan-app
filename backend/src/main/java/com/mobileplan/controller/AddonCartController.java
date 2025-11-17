package com.mobileplan.controller;

import com.mobileplan.entity.AddonCartItem;
import com.mobileplan.service.AddonCartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addon-cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AddonCartController {

    private final AddonCartService addonCartService;

    @PostMapping("/add")
    public ResponseEntity<AddonCartItem> addAddonToCart(
            @RequestParam Long userId,
            @RequestParam Long addonId) {

        return ResponseEntity.ok(addonCartService.addAddonToCart(userId, addonId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<AddonCartItem>> getAddonCart(@PathVariable Long userId) {
        return ResponseEntity.ok(addonCartService.getAddonCart(userId));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removeAddon(@PathVariable Long itemId) {
        addonCartService.removeAddon(itemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<Void> clearAddonCart(@PathVariable Long userId) {
        addonCartService.clearAddonCart(userId);
        return ResponseEntity.noContent().build();
    }
}
