package com.mobileplan.repository;

import com.mobileplan.entity.CartPlan;
import com.mobileplan.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartPlanRepository extends JpaRepository<CartPlan, Long> {
    List<CartPlan> findByUser(User user);
    void deleteByUser(User user);
}
