package com.elinor.recipes.dto;

import com.elinor.recipes.model.Recipe;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RecipeDTO {
    private String title;
    private String description;
    private Integer prepTime;
    private Integer cookingTime;
    private String imageData;
    private String imageType;

    public RecipeDTO(Recipe recipe) {
        this.title = recipe.getTitle();
        this.description = recipe.getDescription();
        this.prepTime = recipe.getPrepTime();
        this.cookingTime = recipe.getCookingTime();
        this.imageData = recipe.getImageData();
        this.imageType = recipe.getImageType();
    }
}