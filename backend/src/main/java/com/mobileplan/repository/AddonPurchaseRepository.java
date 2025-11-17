package com.mobileplan.repository;

import com.mobileplan.entity.AddonPurchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddonPurchaseRepository extends JpaRepository<AddonPurchase, Long> {
    List<AddonPurchase> findByUserId(Long userId);
}
