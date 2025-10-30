package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.UserDTO;
import com.elinor.recipes.model.User;


public class UserMapper {

    public static User updatedUserToEntity(User user, UserDTO userDTO) {
        if (user == null) return null;

        user.setBio(userDTO.getBio());
        user.setEmail(userDTO.getEmail());
        user.setLastName(userDTO.getLastName());
        user.setFirstName(userDTO.getFirstName());
        user.setImage(ImageMapper.toEntity(userDTO.getImageDTO()));

        return user;
    }

    public static UserDTO toDTO(User user) {
        if (user == null) return null;

        UserDTO userDTO = new UserDTO();
        userDTO.setBio(user.getBio());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setLastName(user.getLastName());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setImageDTO(ImageMapper.toDTO(user.getImage()));

        return userDTO;
    }

    public static User toEntity(UserDTO userDTO) {
        if (userDTO == null) return null;

        User user = new User();

        user.setBio(userDTO.getBio());
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setLastName(userDTO.getLastName());
        user.setFirstName(userDTO.getFirstName());
        user.setImage(ImageMapper.toEntity(userDTO.getImageDTO()));

        return user;
    }
}
