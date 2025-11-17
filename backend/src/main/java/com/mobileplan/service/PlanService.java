package com.mobileplan.service;

import com.mobileplan.dto.CompareRequest;
import com.mobileplan.dto.CustomizeRequest;
import com.mobileplan.entity.CustomPlan;
import com.mobileplan.entity.Plan;
import com.mobileplan.repository.CustomPlanRepository;
import com.mobileplan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;
    private final CustomPlanRepository customPlanRepository;
    private final PricingEngine pricingEngine;

    public Page<Plan> findPlans(Optional<String> type, Optional<Integer> maxPrice,
            Optional<Integer> minValidity, Pageable pageable) {
			Page<Plan> page;
			if (type.isPresent()) {
			page = planRepository.findByTypeIgnoreCase(type.get(), pageable);
			} else {
			page = planRepository.findAll(pageable);
			}
			
			// Filter in-memory
			List<Plan> filtered = page.getContent().stream()
			.filter(p -> maxPrice.map(mp -> p.getPrice().compareTo(BigDecimal.valueOf(mp)) <= 0).orElse(true))
			.filter(p -> minValidity.map(v -> p.getValidityDays() >= v).orElse(true))
			.collect(Collectors.toList());
			
			return new PageImpl<>(filtered, pageable, filtered.size());
	}


    public Optional<Plan> getPlan(Long id) {
        return planRepository.findById(id);
    }

    public List<Plan> comparePlans(CompareRequest req) {
        List<String> names = Optional.ofNullable(req.getPlanNames()).orElse(Collections.emptyList());
        if (names.isEmpty()) {
            return Collections.emptyList();
        }
        return planRepository.findByNameInIgnoreCase(names);
    }


    public CustomPlan customizePlan(CustomizeRequest req) {
        BigDecimal price = pricingEngine.calculateCustomPrice(
                req.getDataMB(), req.getVoiceMinutes(), req.getSmsCount(), req.getRoamingIncluded());

        CustomPlan cp = CustomPlan.builder()
                .name(req.getName() != null ? req.getName() : "Custom Plan")
                .dataMB(req.getDataMB())
                .voiceMinutes(req.getVoiceMinutes())
                .smsCount(req.getSmsCount())
                .roamingIncluded(req.getRoamingIncluded())
                .price(price)
                .createdBy(req.getCreatedBy())
                .build();

        return customPlanRepository.save(cp);
    }

    public List<Plan> recommendByBudget(int budgetInINR, Optional<Boolean> roamingNeeded) {
        // Simple rule: return plans with price <= budget, optionally roaming filter
        List<Plan> candidates = planRepository.findAll().stream()
                .filter(p -> p.getPrice().compareTo(BigDecimal.valueOf(budgetInINR)) <= 0)
                .filter(p -> roamingNeeded.map(r -> p.getRoamingIncluded().equals(r)).orElse(true))
                .sorted(Comparator.comparing(Plan::getPrice))
                .limit(10)
                .collect(Collectors.toList());
        return candidates;
    }
    
    
    public Plan createPlan(Plan plan) {
        return planRepository.save(plan);
    }

}
