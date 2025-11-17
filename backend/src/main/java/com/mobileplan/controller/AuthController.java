package com.mobileplan.controller;

import com.mobileplan.dto.*;
import com.mobileplan.entity.User;
import com.mobileplan.repository.UserRepository;
import com.mobileplan.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final OtpService otpService;
    private final JwtUtil jwtUtil;
    private final PasswordResetService resetService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated @RequestBody RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered"));
        }
        if (userRepository.existsByMobile(req.getMobile())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Mobile already registered"));
        }

        User u = User.builder()
                .email(req.getEmail())
                .mobile(req.getMobile())
                .password(req.getPassword())
                .name(req.getName())
                .address(req.getAddress())
                .build();

        User savedUser = userService.register(u);

        // generate OTP (demo prints)
        String otp = otpService.generate(req.getMobile());

        return ResponseEntity.ok(Map.of(
                "message", "Registered. Verify OTP sent (demo)",
                "otp", otp,
                "user", UserDTO.fromEntity(savedUser) // return clean user DTO
        ));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@Validated @RequestBody OtpVerifyRequest req) {
        boolean ok = otpService.verify(req.getMobile(), req.getOtp());
        if (!ok) return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired OTP"));
        return ResponseEntity.ok(Map.of("message", "OTP verified"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated @RequestBody LoginRequest req) {
        var opt = userService.login(req.getEmailOrMobile(), req.getPassword());
        if (opt.isEmpty()) return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));

        User user = opt.get();
        String token = jwtUtil.generateToken(user.getId().toString());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", UserDTO.fromEntity(user) // now works
        ));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Validated @RequestBody ForgotPasswordRequest req) {
        var opt = userService.findByEmailOrMobile(req.getEmailOrMobile());
        if (opt.isEmpty()) return ResponseEntity.badRequest().body(Map.of("error", "User not found"));

        String token = resetService.createToken(opt.get().getId());

        return ResponseEntity.ok(Map.of(
                "message", "Password reset token generated (demo)",
                "token", token
        ));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Validated @RequestBody ResetPasswordRequest req) {
    	// inside reset-password
    	Long userId = resetService.validateToken(req.getToken());
    	if (userId == null) return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired token"));

    	User user = userService.getById(userId).orElseThrow(); // getById returns Optional<User>
    	user.setPassword(req.getNewPassword()); // now typed correctly
    	userService.register(user); // expects User, works now

    	return ResponseEntity.ok(Map.of("message", "Password reset successfully"));

    }
}
