package com.mobileplan.repository;

import com.mobileplan.entity.Plan;
import com.mobileplan.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Long> {

    // Return paginated results
    Page<Plan> findByTypeIgnoreCase(String type, Pageable pageable);

    // For compare by names
    List<Plan> findByNameInIgnoreCase(List<String> names);
}
