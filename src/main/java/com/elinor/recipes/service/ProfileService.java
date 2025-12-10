package com.elinor.recipes.service;

import com.elinor.recipes.dto.UserDTO;
import com.elinor.recipes.mapper.CropParametersMapper;
import com.elinor.recipes.mapper.ImageMapper;
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

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ImageMapper imageMapper;
    @Autowired
    private CropParametersMapper cropParametersMapper;

    public UserDTO getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return userMapper.toDTO(user);
    }

    public void updateUserProfile(UserDTO updatedUser) {
        User user = userRepository.findById(updatedUser.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        userMapper.updateEntity(updatedUser, user);

        if (updatedUser.getImage() != null) {
            user.setImage(imageMapper.toEntity(updatedUser.getImage()));
            if (updatedUser.getImage().getCropParameters() != null) {
                user.getImage().setCropParameters(cropParametersMapper.toEntity(updatedUser.getImage().getCropParameters()));
            }
        }

        userRepository.save(user);
    }
}
