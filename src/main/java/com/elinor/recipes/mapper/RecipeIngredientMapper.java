package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.RecipeIngredientDTO;
import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.RecipeIngredient;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {IngredientMapper.class}
)
public interface RecipeIngredientMapper {

    RecipeIngredientDTO toDTO(RecipeIngredient entity);

    List<RecipeIngredientDTO> toDTOList(List<RecipeIngredient> entities);

    RecipeIngredient toEntity(RecipeIngredientDTO dto, Recipe recipe);

}
