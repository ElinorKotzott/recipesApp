package com.elinor.recipes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;


@AllArgsConstructor
@Data
public class UserDTO {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String bio;
    private String profilePictureData;
    private String profilePictureType;
}