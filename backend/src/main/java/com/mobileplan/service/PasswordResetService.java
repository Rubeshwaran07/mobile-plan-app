package com.mobileplan.service;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PasswordResetService {

    private static class Entry { final Long userId; final Instant expiresAt; Entry(Long u, Instant e){userId=u;expiresAt=e;} }

    private final Map<String, Entry> store = new ConcurrentHashMap<>();

    public String createToken(Long userId) {
        String token = UUID.randomUUID().toString();
        store.put(token, new Entry(userId, Instant.now().plusSeconds(900)));
        // In prod: send token via email/sms link
        System.out.println("[RESET] token=" + token + " userId=" + userId);
        return token;
    }

    public Long validateToken(String token) {
        var e = store.get(token);
        if (e == null) return null;
        if (Instant.now().isAfter(e.expiresAt)) { store.remove(token); return null; }
        // consume token
        store.remove(token);
        return e.userId;
    }
}
