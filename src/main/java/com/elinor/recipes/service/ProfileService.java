package com.elinor.recipes.service;

import com.elinor.recipes.dto.UserDTO;
import com.elinor.recipes.mapper.UserMapper;
import com.elinor.recipes.model.User;
import com.elinor.recipes.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProfileService {

    @Autowired
    private UserRepository userRepository;

    public UserDTO getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return UserMapper.toDTO(user);
    }

    public void updateUserProfile(UserDTO updatedUser, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserMapper.updatedUserToEntity(user, updatedUser);
    }
}
