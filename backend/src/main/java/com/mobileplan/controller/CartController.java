package com.mobileplan.controller;

import com.mobileplan.entity.CartAddon;
import com.mobileplan.entity.CartPlan;
import com.mobileplan.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartService cartService;

    // 🛒 Add Plan
    @PostMapping("/add/plan")
    public String addPlanToCart(@RequestParam Long userId, @RequestParam Long planId) {
        cartService.addPlanToCart(userId, planId);
        return "Plan added to cart!";
    }

    // 🧩 Add Addon
    @PostMapping("/add/addon")
    public String addAddonToCart(@RequestParam Long userId, @RequestParam Long addonId) {
        cartService.addAddonToCart(userId, addonId);
        return "Addon added to cart!";
    }

    // 📦 Get User's Plans
    @GetMapping("/plan/user/{userId}")
    public List<CartPlan> getUserPlans(@PathVariable Long userId) {
        return cartService.getUserPlanCart(userId);
    }

    // ⚙️ Get User's Addons
    @GetMapping("/addon/user/{userId}")
    public List<CartAddon> getUserAddons(@PathVariable Long userId) {
        return cartService.getUserAddonCart(userId);
    }

    // ❌ Remove specific plan
    @DeleteMapping("/plan/{id}")
    public String removePlan(@PathVariable Long id) {
        cartService.removePlan(id);
        return "Plan removed from cart!";
    }

    // ❌ Remove specific addon
    @DeleteMapping("/addon/{id}")
    public String removeAddon(@PathVariable Long id) {
        cartService.removeAddon(id);
        return "Addon removed from cart!";
    }

    // 🧹 Clear entire cart
    @DeleteMapping("/clear/{userId}")
    public String clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return "Cart cleared!";
    }
}
