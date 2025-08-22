package com.elinor.recipes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    private List<StepDTO> stepDTOList;
    private List<TagDTO> tagDTOList;
    private boolean favorite;
    private Double proteinPerServing;
    private Double carbsPerServing;
    private Double fatPerServing;
    private Integer servings;
    private Double caloriesPerServing;
    private Long creatorId;
}
