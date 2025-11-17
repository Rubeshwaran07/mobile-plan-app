package com.mobileplan.repository;

import com.mobileplan.entity.AddonCartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AddonCartRepository extends JpaRepository<AddonCartItem, Long> {
    List<AddonCartItem> findByUserId(Long userId);
    void deleteByUserId(Long userId);
}
