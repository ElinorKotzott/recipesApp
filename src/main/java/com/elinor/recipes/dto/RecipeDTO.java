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
    private String ingredients;
    private String method;
    private List<String> tags;
    private boolean favorite;

    public RecipeDTO(Recipe recipe, boolean favorite) {
        this.id = recipe.getId();
        this.title = recipe.getTitle();
        this.description = recipe.getDescription();
        this.prepTime = recipe.getPrepTime();
        this.cookingTime = recipe.getCookingTime();
        this.imageData = recipe.getImageData();
        this.imageType = recipe.getImageType();
        this.ingredients = recipe.getIngredients();
        this.method = recipe.getMethod();
        this.tags = recipe.getTagList().stream().map(Tag::getText).collect(Collectors.toList());
        this.favorite = favorite;
    }
}