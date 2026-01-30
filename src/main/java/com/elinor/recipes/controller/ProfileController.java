package com.elinor.recipes.controller;

import com.elinor.recipes.dto.UserDTO;
import com.elinor.recipes.model.User;
import com.elinor.recipes.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getUserInfo(Authentication authentication) {
        Long userId = ((User) authentication.getPrincipal()).getId();
        UserDTO currentUser = profileService.getUserProfile(userId);
        return ResponseEntity.ok(currentUser);
    }

    @PutMapping("/profile/change")
    public ResponseEntity<UserDTO> updateUserInfo(@RequestBody UserDTO updatedUser) {
        UserDTO updatedUserFromDB = profileService.updateUserProfile(updatedUser);
        return ResponseEntity.ok(updatedUserFromDB);
    }
}