package com.mobileplan.service;

import com.mobileplan.entity.*;
import com.mobileplan.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final UserRepository userRepository;
    private final CartPlanRepository planCartRepository;
    private final CartAddonRepository addonCartRepository;
    private final OrderRepository orderRepository;
    private final PlanRepository planRepository;


    public Order placeOrder(Long userId) {
        // Fetch user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch all plan and addon cart items
        List<CartPlan> planCart = planCartRepository.findByUser(user);
        List<CartAddon> addonCart = addonCartRepository.findByUser(user);

        // Extract plans and addons
        List<Plan> plans = planCart.stream()
                .map(CartPlan::getPlan)
                .collect(Collectors.toList());

        List<Addon> addons = addonCart.stream()
                .map(CartAddon::getAddon)
                .collect(Collectors.toList());

        // Calculate total price
        BigDecimal planTotal = plans.stream()
                .map(Plan::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal addonTotal = addons.stream()
                .map(Addon::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal total = planTotal.add(addonTotal);

        // Build and save order
        Order order = Order.builder()
                .user(user)
                .plans(plans)
                .addons(addons)
                .totalAmount(total)
                .paymentStatus("Done") // Payment completed
                .orderDate(LocalDateTime.now())
                .build();

        orderRepository.save(order);

        // Clear user's cart after order
        planCartRepository.deleteAll(planCart);
        addonCartRepository.deleteAll(addonCart);

        return order;
    }
    
    public List<Order> getOrdersByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUser(user);
    }
    
    @Transactional
    public Order placeCustomOrder(Long userId, Order orderRequest) {
        // Fetch the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Ensure we have a valid custom plan
        Plan customPlan = orderRequest.getPlans().stream()
                .filter(plan -> plan != null && plan.getName() != null && !plan.getName().isEmpty())
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No valid custom plan provided"));

        // Ensure the plan name defaults to "Custom Plan" if it is not set
        if (customPlan.getName() == null || customPlan.getName().isBlank()) {
            customPlan.setName("Custom Plan");
        }

        // Save the custom plan if not already persisted
        Plan savedPlan = planRepository.save(customPlan); 

        // Build the order
        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(orderRequest.getTotalAmount()); // Assuming custom plan price is passed
        order.setPaymentStatus("Done");
        order.setPlans(Collections.singletonList(savedPlan));  // Ensure we save the plan in the order
        order.setAddons(orderRequest.getAddons());  // If no addons are passed, this will be an empty list

        // Save the order
        return orderRepository.save(order);
    }



}
