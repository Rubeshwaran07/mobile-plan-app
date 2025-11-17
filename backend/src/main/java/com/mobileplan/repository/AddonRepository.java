package com.mobileplan.repository;

import com.mobileplan.entity.Addon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddonRepository extends JpaRepository<Addon, Long> {
    List<Addon> findByPlanId(Long planId);
}
