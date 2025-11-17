package com.mobileplan.controller;

import com.mobileplan.dto.CompareRequest;
import com.mobileplan.dto.CustomizeRequest;
import com.mobileplan.dto.PlanDTO;
import com.mobileplan.entity.CustomPlan;
import com.mobileplan.entity.Plan;
import com.mobileplan.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // for dev - tighten in prod
public class PlanController {

    private final PlanService planService;
    
    
    

    // ----------------- CREATE PLAN -----------------
    @PostMapping
    public ResponseEntity<Plan> createPlan(@RequestBody PlanDTO planDTO) {
        Plan plan = Plan.builder()
                .name(planDTO.getName())
                .type(planDTO.getType())
                .description(planDTO.getDescription())
                .validityDays(planDTO.getValidityDays())
                .dataMB(planDTO.getDataMB())
                .voiceMinutes(planDTO.getVoiceMinutes())
                .smsCount(planDTO.getSmsCount())
                .roamingIncluded(planDTO.getRoamingIncluded())
                .price(planDTO.getPrice())
                .build();

        Plan savedPlan = planService.createPlan(plan);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPlan);
    }

    // ----------------- GET ALL PLANS -----------------
    @GetMapping
    public ResponseEntity<?> listPlans(
            @RequestParam Optional<String> type,
            @RequestParam Optional<Integer> maxPrice,
            @RequestParam Optional<Integer> minValidity,
            @RequestParam Optional<Integer> page,
            @RequestParam Optional<Integer> size
    ) {
        int p = page.orElse(0);
        int s = size.orElse(20);
        Page<Plan> result = planService.findPlans(type, maxPrice, minValidity, PageRequest.of(p, s));
        return ResponseEntity.ok(result);
    }

    // ----------------- GET PLAN BY ID -----------------
    @GetMapping("/{id}")
    public ResponseEntity<?> getPlan(@PathVariable Long id) {
        return planService.getPlan(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ----------------- COMPARE PLANS -----------------
    @PostMapping("/compare")
    public ResponseEntity<?> compare(@RequestBody CompareRequest req) {
        List<Plan> plans = planService.comparePlans(req);
        return ResponseEntity.ok(plans);
    }

    // ----------------- CUSTOMIZE PLAN -----------------
    @PostMapping("/customize")
    public ResponseEntity<?> customize(@RequestBody CustomizeRequest req) {
        CustomPlan cp = planService.customizePlan(req);
        return ResponseEntity.ok(cp);
    }

    // ----------------- RECOMMEND PLANS -----------------
    @GetMapping("/recommendations")
    public ResponseEntity<?> recommendations(@RequestParam int budget,
                                             @RequestParam Optional<Boolean> roaming) {
        return ResponseEntity.ok(planService.recommendByBudget(budget, roaming));
    }
}
