package com.elinor.recipes.dto;

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
    private String imageType;
}