package com.mobileplan.service;

import com.mobileplan.dto.ProfileDTO;
import com.mobileplan.dto.UserDTO;
import com.mobileplan.entity.PaymentMethod;
import com.mobileplan.entity.User;
import com.mobileplan.entity.UserProfile;
import com.mobileplan.repository.PaymentMethodRepository;
import com.mobileplan.repository.UserProfileRepository;
import com.mobileplan.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserProfileRepository profileRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User findByMobile(String mobile) {
        return userRepository.findByMobile(mobile)
                .orElseThrow(() -> new RuntimeException("User not found with mobile: " + mobile));
    }

    
    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }
    
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saved = userRepository.save(user);

        // Create default profile
        UserProfile profile = UserProfile.builder()
                .user(saved).notificationEnabled(true)
                .notificationPreference("EMAIL")
                .build();

        saved.setProfile(profile);
        profileRepository.save(profile);
        return saved;
    }

    public Optional<User> findByEmailOrMobile(String emailOrMobile) {
        return userRepository.findByEmail(emailOrMobile).or(() -> userRepository.findByMobile(emailOrMobile));
    }

    public Optional<User> login(String emailOrMobile, String rawPassword) {
        return findByEmailOrMobile(emailOrMobile)
                .filter(u -> passwordEncoder.matches(rawPassword, u.getPassword()));
    }

    public Optional<UserDTO> getUserDTOById(Long id) {
        return userRepository.findById(id).map(this::convertToDTO);
    }

    private UserDTO convertToDTO(User user) {
        UserProfile profile = profileRepository.findByUserId(user.getId()).orElse(null);
        ProfileDTO profileDTO = null;

        if (profile != null) {
            profileDTO = new ProfileDTO(
                    profile.getAddress(),
                    profile.getCity(),
                    profile.getState(),
                    profile.getPostalCode(),
                    profile.getPaymentMethod(),
                    profile.getNotificationPreference(),
                    profile.getNotificationEnabled()
            );
        }

        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getMobile(),
                profileDTO
        );
    }

    public User updateProfile(User user) {
        User existing = userRepository.findById(user.getId()).orElseThrow();
        existing.setName(user.getName());
        existing.setAddress(user.getAddress());
        userRepository.save(existing);
        return existing;
    }

    public PaymentMethod addPaymentMethod(Long userId, PaymentMethod pm) {
        User u = userRepository.findById(userId).orElseThrow();
        pm.setUser(u);
        PaymentMethod saved = paymentMethodRepository.save(pm);
        u.getPaymentMethods().add(saved);
        userRepository.save(u);
        return saved;
    }

    public List<PaymentMethod> listPaymentMethods(Long userId) {
        return paymentMethodRepository.findByUserId(userId);
    }

    public UserProfile updatePreferences(Long userId, UserProfile profile) {
        Optional<UserProfile> optProfile = profileRepository.findByUserId(userId);
        UserProfile existingProfile;

        if (optProfile.isEmpty()) {
            var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            profile.setUser(user);
            existingProfile = profileRepository.save(profile);
        } else {
            existingProfile = optProfile.get();
            existingProfile.setNotificationEnabled(profile.getNotificationEnabled());
            existingProfile.setNotificationPreference(profile.getNotificationPreference());
            existingProfile.setPaymentMethod(profile.getPaymentMethod());
            profileRepository.save(existingProfile);
        }

        return existingProfile;
    }
    
    
    
    
    
    
    
    
    
    public User getUserWithProfile(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUserAndProfile(Long userId, User updatedUser) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update simple fields
        if (updatedUser.getName() != null) existingUser.setName(updatedUser.getName());
        if (updatedUser.getEmail() != null) existingUser.setEmail(updatedUser.getEmail());
        if (updatedUser.getMobile() != null) existingUser.setMobile(updatedUser.getMobile());
        if (updatedUser.getAddress() != null) existingUser.setAddress(updatedUser.getAddress());

        // Update or create profile
        UserProfile profile = existingUser.getProfile();
        if (profile == null) {
            profile = new UserProfile();
            profile.setUser(existingUser);
        }

        if (updatedUser.getProfile() != null) {
            UserProfile updatedProfile = updatedUser.getProfile();
            if (updatedProfile.getAddress() != null) profile.setAddress(updatedProfile.getAddress());
            if (updatedProfile.getCity() != null) profile.setCity(updatedProfile.getCity());
            if (updatedProfile.getState() != null) profile.setState(updatedProfile.getState());
            if (updatedProfile.getPostalCode() != null) profile.setPostalCode(updatedProfile.getPostalCode());
            if (updatedProfile.getPaymentMethod() != null) profile.setPaymentMethod(updatedProfile.getPaymentMethod());
            if (updatedProfile.getNotificationPreference() != null)
                profile.setNotificationPreference(updatedProfile.getNotificationPreference());
            if (updatedProfile.getNotificationEnabled() != null)
                profile.setNotificationEnabled(updatedProfile.getNotificationEnabled());
        }

        profileRepository.save(profile);
        existingUser.setProfile(profile);

        return userRepository.save(existingUser);
    }

}
