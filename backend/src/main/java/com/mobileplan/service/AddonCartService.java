package com.mobileplan.service;

import com.mobileplan.entity.Addon;
import com.mobileplan.entity.AddonCartItem;
import com.mobileplan.repository.AddonCartRepository;
import com.mobileplan.repository.AddonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddonCartService {

    private final AddonCartRepository addonCartRepository;
    private final AddonRepository addonRepository;

    public AddonCartItem addAddonToCart(Long userId, Long addonId) {
        Addon addon = addonRepository.findById(addonId)
                .orElseThrow(() -> new RuntimeException("Addon not found"));

        AddonCartItem item = AddonCartItem.builder()
                .userId(userId)
                .addon(addon)
                .quantity(1)
                .build();

        return addonCartRepository.save(item);
    }

    public List<AddonCartItem> getAddonCart(Long userId) {
        return addonCartRepository.findByUserId(userId);
    }

    public void removeAddon(Long itemId) {
        addonCartRepository.deleteById(itemId);
    }

    public void clearAddonCart(Long userId) {
        addonCartRepository.deleteByUserId(userId);
    }
}
