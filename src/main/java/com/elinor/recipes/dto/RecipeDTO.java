package com.elinor.recipes.dto;

import com.elinor.recipes.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;


@AllArgsConstructor
@Data
public class RecipeDTO {
    private String title;
    private String description;
    private Integer prepTime;
    private Integer cookingTime;
    private String image;
    private User user;
}