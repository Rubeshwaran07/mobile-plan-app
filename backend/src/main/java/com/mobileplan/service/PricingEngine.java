package com.mobileplan.service;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class PricingEngine {

    /**
     * Very basic pricing model:
     * - base cost per MB, per voice minute, per SMS
     * - roaming adds fixed surcharge
     *
     * This is a simple scaffold — replace with dynamic rules or AI later.
     */
    private static final BigDecimal COST_PER_MB = new BigDecimal("0.005"); // ₹0.005 per MB => ₹5 per GB
    private static final BigDecimal COST_PER_MIN = new BigDecimal("0.20"); // ₹0.20 per minute
    private static final BigDecimal COST_PER_SMS = new BigDecimal("0.10");  // ₹0.10 per SMS
    private static final BigDecimal ROAMING_SURCHARGE = new BigDecimal("199");

    public BigDecimal calculateCustomPrice(Integer dataMB, Integer voiceMinutes, Integer smsCount, Boolean roaming) {
        BigDecimal price = BigDecimal.ZERO;
        if (dataMB != null && dataMB > 0) {
            price = price.add(COST_PER_MB.multiply(BigDecimal.valueOf(dataMB)));
        }
        if (voiceMinutes != null && voiceMinutes > 0) {
            price = price.add(COST_PER_MIN.multiply(BigDecimal.valueOf(voiceMinutes)));
        }
        if (smsCount != null && smsCount > 0) {
            price = price.add(COST_PER_SMS.multiply(BigDecimal.valueOf(smsCount)));
        }
        if (Boolean.TRUE.equals(roaming)) {
            price = price.add(ROAMING_SURCHARGE);
        }
        // ensure minimum and round
        if (price.compareTo(BigDecimal.valueOf(49)) < 0) price = BigDecimal.valueOf(49); // min price
        return price.setScale(2, BigDecimal.ROUND_HALF_UP);
    }
}
