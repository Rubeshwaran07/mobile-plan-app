package com.mobileplan.service;

import com.mobileplan.entity.Addon;
import com.mobileplan.entity.AddonPurchase;
import com.mobileplan.entity.Plan;
import com.mobileplan.repository.AddonPurchaseRepository;
import com.mobileplan.repository.AddonRepository;
import com.mobileplan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddonService {

    private final AddonRepository addonRepository;
    private final AddonPurchaseRepository addonPurchaseRepository;
    private final PlanRepository planRepository;

    // ✅ Get all add-ons
    public List<Addon> getAllAddons() {
        return addonRepository.findAll();
    }

    // ✅ Create new add-on
    public Addon createAddon(Addon addon) {
        return addonRepository.save(addon);
    }

    // ✅ Update existing add-on
    public Addon updateAddon(Long id, Addon updatedAddon) {
        Addon existing = addonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Add-on not found with id: " + id));

        existing.setName(updatedAddon.getName());
        existing.setDescription(updatedAddon.getDescription());
        existing.setPrice(updatedAddon.getPrice());

        // optionally update plan if provided
        if (updatedAddon.getPlan() != null) {
            existing.setPlan(updatedAddon.getPlan());
        }

        return addonRepository.save(existing);
    }

    // ✅ Purchase Add-on (same as before)
    public AddonPurchase purchaseAddon(Long userId, Long planId, Long addonId) {
        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found for ID: " + planId));

        Addon addon = addonRepository.findById(addonId)
                .orElseThrow(() -> new RuntimeException("Addon not found for ID: " + addonId));

        List<AddonPurchase> existing = addonPurchaseRepository.findByUserId(userId);
        boolean alreadyPurchased = existing.stream()
                .anyMatch(p -> p.getAddon().getId().equals(addonId) && p.getPlan().getId().equals(planId));
        if (alreadyPurchased) {
            throw new RuntimeException("You already purchased this add-on for this plan.");
        }

        AddonPurchase purchase = AddonPurchase.builder()
                .userId(userId)
                .plan(plan)
                .addon(addon)
                .build();

        return addonPurchaseRepository.save(purchase);
    }

    public List<AddonPurchase> getUserAddons(Long userId) {
        return addonPurchaseRepository.findByUserId(userId);
    }
}
