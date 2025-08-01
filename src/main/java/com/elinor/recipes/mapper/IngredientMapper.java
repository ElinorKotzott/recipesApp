package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.IngredientDTO;
import com.elinor.recipes.model.Ingredient;

import java.util.List;
import java.util.stream.Collectors;

public class IngredientMapper {

    public static IngredientDTO toDTO(Ingredient ingredient) {
        if (ingredient == null) return null;

        IngredientDTO dto = new IngredientDTO();
        dto.setId(ingredient.getId());
        dto.setName(ingredient.getName());
        return dto;
    }

    public static Ingredient toEntity(IngredientDTO dto) {
        if (dto == null) return null;

        Ingredient ingredient = new Ingredient();
        ingredient.setId(dto.getId());
        ingredient.setName(dto.getName());
        return ingredient;
    }

    public static List<IngredientDTO> toDTOList(List<Ingredient> ingredients) {
        return ingredients.stream()
                .map(IngredientMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<Ingredient> toEntityList(List<IngredientDTO> dtos) {
        return dtos.stream()
                .map(IngredientMapper::toEntity)
                .collect(Collectors.toList());
    }
}
