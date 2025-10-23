package com.elinor.recipes.controller;

import com.elinor.recipes.model.AuthenticationResponse;
import com.elinor.recipes.model.User;
import com.elinor.recipes.service.AuthenticationService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Data
@RestController
public class AuthenticationController {

    @Autowired
    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User request) {
        authService.register(request);
        return ResponseEntity
                .status(201)
                .body(java.util.Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request) {
        try {
            AuthenticationResponse response = authService.authenticate(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(401)
                    .body(java.util.Map.of("error", e.getMessage()));
        }
    }
}
