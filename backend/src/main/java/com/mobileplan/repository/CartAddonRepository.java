package com.mobileplan.repository;

import com.mobileplan.entity.CartAddon;
import com.mobileplan.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartAddonRepository extends JpaRepository<CartAddon, Long> {
    List<CartAddon> findByUser(User user);
    void deleteByUser(User user);
}
