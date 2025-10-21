package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.UserDTO;
import com.elinor.recipes.model.User;


public class UserMapper {

    public static UserDTO toDTO(User user) {
        if (user == null) return null;

        UserDTO userDTO = new UserDTO();
        userDTO.setBio(user.getBio());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setLastName(user.getLastName());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setCropParameters(user.getCropParameters());
        userDTO.setProfilePictureData(user.getProfilePictureData());
        userDTO.setProfilePictureType(user.getProfilePictureType());

        return userDTO;
    }

    public static User toEntity(User user, UserDTO userDTO) {
        if (userDTO == null) return null;

        user.setBio(userDTO.getBio());
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setLastName(userDTO.getLastName());
        user.setFirstName(userDTO.getFirstName());
        user.setCropParameters(userDTO.getCropParameters());
        user.setProfilePictureData(userDTO.getProfilePictureData());
        user.setProfilePictureType(userDTO.getProfilePictureType());

        return user;
    }
}
