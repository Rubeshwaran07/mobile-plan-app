package com.mobileplan.controller;

import com.mobileplan.dto.UserDTO;
import com.mobileplan.entity.PaymentMethod;
import com.mobileplan.entity.User;
import com.mobileplan.entity.UserProfile;
import com.mobileplan.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ProfileController {

    private final UserService userService;

    // Fetch profile
    @GetMapping("/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) {
        try {
            User user = userService.getUserWithProfile(id);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Update profile
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProfile(
            @PathVariable Long id,
            @RequestBody User updatedUser
    ) {
        try {
            User user = userService.updateUserAndProfile(id, updatedUser);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }



    @PostMapping("/{userId}/payment")
    public ResponseEntity<?> addPaymentMethod(@PathVariable Long userId, @RequestBody PaymentMethod pm) {
        PaymentMethod saved = userService.addPaymentMethod(userId, pm);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{userId}/payment")
    public ResponseEntity<List<PaymentMethod>> listPaymentMethods(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.listPaymentMethods(userId));
    }

    @PutMapping("/{userId}/preferences")
    public ResponseEntity<?> updatePrefs(@PathVariable Long userId, @RequestBody UserProfile profile) {
        UserProfile updated = userService.updatePreferences(userId, profile);
        return ResponseEntity.ok(updated);
    }
}
