package com.mobileplan.controller;

import com.mobileplan.entity.Addon;
import com.mobileplan.entity.AddonPurchase;
import com.mobileplan.service.AddonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/addons")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // for dev - tighten in prod
public class AddonController {

    private final AddonService addonService;

    // ✅ 1. Get all add-ons
    @GetMapping
    public ResponseEntity<List<Addon>> getAllAddons() {
        return ResponseEntity.ok(addonService.getAllAddons());
    }

    // ✅ 2. Create a new add-on
    @PostMapping
    public ResponseEntity<Addon> createAddon(@RequestBody Addon addon) {
        Addon created = addonService.createAddon(addon);
        return ResponseEntity.ok(created);
    }

    // ✅ 3. Update an existing add-on
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAddon(@PathVariable Long id, @RequestBody Addon updatedAddon) {
        try {
            Addon addon = addonService.updateAddon(id, updatedAddon);
            return ResponseEntity.ok(addon);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ✅ 4. Purchase add-on
    @PostMapping("/purchase")
    public ResponseEntity<?> purchaseAddon(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long planId = request.get("planId");
        Long addonId = request.get("addonId");

        if (userId == null || planId == null || addonId == null) {
            return ResponseEntity.badRequest().body("Missing userId, planId, or addonId");
        }

        try {
            AddonPurchase purchase = addonService.purchaseAddon(userId, planId, addonId);
            return ResponseEntity.ok(purchase);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ✅ 5. Get user’s purchased add-ons
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AddonPurchase>> getUserAddons(@PathVariable Long userId) {
        return ResponseEntity.ok(addonService.getUserAddons(userId));
    }
}
