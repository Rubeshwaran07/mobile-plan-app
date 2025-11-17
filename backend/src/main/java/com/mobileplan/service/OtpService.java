package com.mobileplan.service;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private static class Entry { final String code; final Instant expiresAt; Entry(String c, Instant e){code=c;expiresAt=e;} }

    private final Map<String, Entry> store = new ConcurrentHashMap<>();
    private final Random rnd = new Random();

    public String generate(String mobile) {
        String otp = String.format("%06d", rnd.nextInt(1_000_000));
        store.put(mobile, new Entry(otp, Instant.now().plusSeconds(300)));
        // In prod: send SMS
        System.out.println("[OTP] mobile=" + mobile + " otp=" + otp);
        return otp;
    }

    public boolean verify(String mobile, String otp) {
        var e = store.get(mobile);
        if (e == null) return false;
        if (Instant.now().isAfter(e.expiresAt)) { store.remove(mobile); return false; }
        boolean ok = e.code.equals(otp);
        if (ok) store.remove(mobile);
        return ok;
    }
}
