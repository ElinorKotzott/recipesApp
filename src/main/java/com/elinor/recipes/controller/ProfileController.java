package com.elinor.recipes.controller;

import com.elinor.recipes.dto.UserDTO;
import com.elinor.recipes.model.User;
import com.elinor.recipes.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getUserInfo(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserDTO userDTO = new UserDTO(user.getUsername(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getBio(), user.getProfilePicture());
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/profile/change")
    public ResponseEntity<String> updateUserInfo(@RequestBody UserDTO updatedUser, Authentication authentication) {
        String currentUsername = authentication.getName();
        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setBio(updatedUser.getBio());

        userRepository.save(user);

        return ResponseEntity.ok().build();
    }
}



