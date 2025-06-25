package com.elinor.recipes.dto;

import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RecipeDTO {
    private Long id;
    private String title;
    private String description;
    private Integer prepTime;
    private Integer cookingTime;
    private String imageData;
    private String imageType;
    private List<String> tags;
    private boolean isFavorite;

    public RecipeDTO(Recipe recipe, boolean isFavorite) {
        this.id = recipe.getId();
        this.title = recipe.getTitle();
        this.description = recipe.getDescription();
        this.prepTime = recipe.getPrepTime();
        this.cookingTime = recipe.getCookingTime();
        this.imageData = recipe.getImageData();
        this.imageType = recipe.getImageType();
        this.tags = recipe.getTagList().stream().map(Tag::getText).collect(Collectors.toList());
        this.isFavorite = isFavorite();
    }

    public RecipeDTO(Recipe recipe) {
        this.title = recipe.getTitle();
        this.description = recipe.getDescription();
        this.prepTime = recipe.getPrepTime();
        this.cookingTime = recipe.getCookingTime();
        this.imageData = recipe.getImageData();
        this.imageType = recipe.getImageType();
        this.isFavorite = false;
    }

}