package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.IngredientDTO;
import com.elinor.recipes.model.Ingredient;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IngredientMapper {

    IngredientDTO toDTO(Ingredient ingredient);

    Ingredient toEntity(IngredientDTO ingredientDTO);

    List<IngredientDTO> toDTOList(List<Ingredient> ingredients);

    List<Ingredient> toEntityList(List<IngredientDTO> ingredientDTOs);
}

