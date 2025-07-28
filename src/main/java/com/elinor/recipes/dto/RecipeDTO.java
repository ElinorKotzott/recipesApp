package com.elinor.recipes.dto;

import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.RecipeIngredient;
import com.elinor.recipes.model.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
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
    private List<RecipeIngredientDTO> recipeIngredientDTOList;
    private String method;
    private List<String> tags;
    private boolean favorite;
    private Double proteinPerServing;
    private Double carbsPerServing;
    private Double fatPerServing;
    private Integer servings;
    private Double caloriesPerServing;
    private Long creatorId;

    public RecipeDTO(Recipe recipe, boolean favorite) {
        this.id = recipe.getId();
        this.title = recipe.getTitle();
        this.description = recipe.getDescription();
        this.prepTime = recipe.getPrepTime();
        this.cookingTime = recipe.getCookingTime();
        this.imageData = recipe.getImageData();
        this.imageType = recipe.getImageType();

        List<RecipeIngredientDTO> tmp = new ArrayList<>();
        for(RecipeIngredient ri : recipe.getRecipeIngredientList()) {
            RecipeIngredientDTO newRI = new RecipeIngredientDTO();
            newRI.setQuantity(ri.getQuantity());
            newRI.setUnit(ri.getUnit());
            IngredientDTO newI = new IngredientDTO();
            newI.setName(ri.getIngredient().getName());
            newI.setId(ri.getIngredient().getId());
            newRI.setIngredientDTO(newI);
            tmp.add(newRI);
        }
        this.recipeIngredientDTOList = tmp;

        this.method = recipe.getMethod();
        this.tags = recipe.getTagList().stream().map(Tag::getText).collect(Collectors.toList());
        this.favorite = favorite;
        this. proteinPerServing = recipe.getProteinPerServing();
        this.carbsPerServing = recipe.getCarbsPerServing();
        this.fatPerServing = recipe.getFatPerServing();
        this.servings = recipe.getServings();
        this.caloriesPerServing = recipe.getCaloriesPerServing();
        this.creatorId = recipe.getUser().getId();
    }
}