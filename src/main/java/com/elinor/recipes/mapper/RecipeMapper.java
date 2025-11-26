package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.RecipeDTO;
import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.RecipeIngredient;
import com.elinor.recipes.model.Step;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {
                ImageMapper.class,
                RecipeIngredientMapper.class,
                StepMapper.class,
                TagMapper.class
        }
)
public interface RecipeMapper {

    RecipeDTO toDTO(Recipe recipe);

    List<RecipeDTO> toDTOList(List<Recipe> recipes);

    Recipe toEntity(RecipeDTO dto);

    List<Recipe> toEntityList(List<RecipeDTO> dtos);

    @AfterMapping
    default void setExtraFields(Recipe recipe, @MappingTarget RecipeDTO dto) {
        dto.setCreatorId(recipe.getUser().getId());
    }

    @AfterMapping
    default void linkStepsAndIngredients(@MappingTarget Recipe recipe) {
        if (recipe.getStepList() != null) {
            for (Step step : recipe.getStepList()) {
                step.setRecipe(recipe);
            }
        }

        if (recipe.getRecipeIngredientList() != null) {
            for (RecipeIngredient ingredient : recipe.getRecipeIngredientList()) {
                ingredient.setRecipe(recipe);
            }
        }
    }
}
