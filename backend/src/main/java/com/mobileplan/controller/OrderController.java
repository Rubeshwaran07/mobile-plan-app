package com.mobileplan.controller;

import com.mobileplan.entity.Order;
import com.mobileplan.service.OrderService;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/place/{userId}")
    public Order placeOrder(@PathVariable Long userId) {
        return orderService.placeOrder(userId);
    }

    @GetMapping("/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        return orderService.getOrdersByUser(userId);
    }
    
    @PostMapping("/custom/{userId}")
    public ResponseEntity<Order> placeCustomOrder(
            @PathVariable Long userId,
            @RequestBody Order orderRequest) {
        Order savedOrder = orderService.placeCustomOrder(userId, orderRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }




}
