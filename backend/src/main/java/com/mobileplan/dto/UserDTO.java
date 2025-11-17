package com.mobileplan.dto;

import lombok.Data;
import com.mobileplan.entity.User;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String mobile;
    private String name;
    private ProfileDTO profile; // add this

    // Full constructor
    public UserDTO(Long id, String email, String name, String mobile, ProfileDTO profile) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.mobile = mobile;
        this.profile = profile;
    }

    public static UserDTO fromEntity(User user, ProfileDTO profileDTO) {
        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getMobile(),
                profileDTO
        );
    }
    
    public static UserDTO fromEntity(User user) {
        return fromEntity(user, null);
    }

}
