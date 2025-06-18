package com.elinor.recipes.controller;

import com.elinor.recipes.dto.UserDTO;
import com.elinor.recipes.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getUserInfo(Authentication authentication) {
        String username = authentication.getName();
        UserDTO currentUser = profileService.getUserProfile(username);
        return ResponseEntity.ok(currentUser);
    }

    @PutMapping("/profile/change")
    public ResponseEntity<String> updateUserInfo(@RequestBody UserDTO updatedUser, Authentication authentication) {
        String currentUsername = authentication.getName();
        profileService.updateUserProfile(currentUsername, updatedUser);
        return ResponseEntity.ok().build();
    }
}