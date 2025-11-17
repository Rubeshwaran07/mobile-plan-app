package com.mobileplan.repository;

import com.mobileplan.entity.CustomPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomPlanRepository extends JpaRepository<CustomPlan, Long> {
}
