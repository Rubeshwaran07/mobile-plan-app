package com.mobileplan.repository;

import com.mobileplan.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUserId(Long userId);
    void deleteByUserId(Long userId);
}
