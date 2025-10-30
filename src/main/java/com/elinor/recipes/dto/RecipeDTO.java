package com.elinor.recipes.dto;

import com.elinor.recipes.model.enumeration.Difficulty;
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
    private ImageDTO imageDTO;
    private List<RecipeIngredientDTO> recipeIngredientDTOList;
    private List<StepDTO> stepDTOList;
    private List<TagDTO> tagDTOList;
    private boolean favorite;
    private Double proteinPerServing;
    private Double carbsPerServing;
    private Double fatPerServing;
    private Integer servings;
    private Double caloriesPerServing;
    private Long creatorId;
    private Difficulty difficulty;
}
