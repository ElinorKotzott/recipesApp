package com.elinor.recipes.dto;

import com.elinor.recipes.model.CropParameters;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
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
    private CropParameters cropParameters;
}