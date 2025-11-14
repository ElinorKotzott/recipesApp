package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.RecipeIngredientDTO;
import com.elinor.recipes.model.RecipeIngredient;
import com.elinor.recipes.model.Recipe;
import org.mapstruct.*;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = { IngredientMapper.class }
)
public interface RecipeIngredientMapper {

    @Mapping(target = "ingredientDTO", source = "ingredient")
    RecipeIngredientDTO toDTO(RecipeIngredient entity);

    List<RecipeIngredientDTO> toDTOList(List<RecipeIngredient> entities);


    @Mapping(target = "recipe", source = "recipe")
    @Mapping(target = "ingredient", source = "dto.ingredientDTO")
    RecipeIngredient toEntity(RecipeIngredientDTO dto, @Context Recipe recipe);

    List<RecipeIngredient> toEntityList(List<RecipeIngredientDTO> dtos, @Context Recipe recipe);


    @ObjectFactory
    default RecipeIngredient createEntity(@Context Recipe recipe) {
        RecipeIngredient entity = new RecipeIngredient();
        entity.setRecipe(recipe);
        return entity;
    }
}
