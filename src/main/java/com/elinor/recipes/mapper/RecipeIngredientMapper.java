package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.RecipeIngredientDTO;
import com.elinor.recipes.model.RecipeIngredient;
import com.elinor.recipes.model.Recipe;

import java.util.List;
import java.util.stream.Collectors;

public class RecipeIngredientMapper {

    public static RecipeIngredientDTO toDTO(RecipeIngredient entity) {
        if (entity == null) return null;

        RecipeIngredientDTO dto = new RecipeIngredientDTO();
        dto.setIngredientDTO(IngredientMapper.toDTO(entity.getIngredient()));
        dto.setQuantity(entity.getQuantity());
        dto.setUnit(entity.getUnit());
        return dto;
    }

    public static RecipeIngredient toEntity(RecipeIngredientDTO dto, Recipe recipe) {
        if (dto == null) return null;

        RecipeIngredient entity = new RecipeIngredient();
        entity.setRecipe(recipe);
        entity.setIngredient(IngredientMapper.toEntity(dto.getIngredientDTO()));
        entity.setQuantity(dto.getQuantity());
        entity.setUnit(dto.getUnit());
        return entity;
    }

    public static List<RecipeIngredientDTO> toDTOList(List<RecipeIngredient> entities) {
        return entities.stream()
                .map(RecipeIngredientMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<RecipeIngredient> toEntityList(List<RecipeIngredientDTO> dtos, Recipe recipe) {
        return dtos.stream()
                .map(dto -> toEntity(dto, recipe))
                .collect(Collectors.toList());
    }
}
