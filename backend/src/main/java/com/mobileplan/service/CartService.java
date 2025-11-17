package com.mobileplan.service;

import com.mobileplan.entity.*;
import com.mobileplan.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartPlanRepository cartPlanRepository;
    private final CartAddonRepository cartAddonRepository;
    private final UserRepository userRepository;
    private final PlanRepository planRepository;
    private final AddonRepository addonRepository;

    // ✅ Add Plan to Cart
    public void addPlanToCart(Long userId, Long planId) {
        User user = userRepository.findById(userId).orElseThrow();
        Plan plan = planRepository.findById(planId).orElseThrow();
        CartPlan cartPlan = CartPlan.builder().user(user).plan(plan).build();
        cartPlanRepository.save(cartPlan);
    }

    // ✅ Add Addon to Cart
    public void addAddonToCart(Long userId, Long addonId) {
        User user = userRepository.findById(userId).orElseThrow();
        Addon addon = addonRepository.findById(addonId).orElseThrow();
        CartAddon cartAddon = CartAddon.builder().user(user).addon(addon).build();
        cartAddonRepository.save(cartAddon);
    }

    // ✅ Get all plans in user's cart
    public List<CartPlan> getUserPlanCart(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return cartPlanRepository.findByUser(user);
    }

    // ✅ Get all addons in user's cart
    public List<CartAddon> getUserAddonCart(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return cartAddonRepository.findByUser(user);
    }

    // ✅ Remove specific plan from cart
    public void removePlan(Long id) {
        cartPlanRepository.deleteById(id);
    }

    // ✅ Remove specific addon from cart
    public void removeAddon(Long id) {
        cartAddonRepository.deleteById(id);
    }

    // ✅ Clear all plans and addons for a user
    public void clearCart(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        cartPlanRepository.deleteByUser(user);
        cartAddonRepository.deleteByUser(user);
    }
}
