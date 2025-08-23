package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.StepDTO;
import com.elinor.recipes.model.Step;
import com.elinor.recipes.model.Recipe;

import java.util.List;
import java.util.stream.Collectors;

public class StepMapper {

    public static StepDTO toDTO(Step step) {
        if (step == null) return null;

        StepDTO dto = new StepDTO();
        dto.setId(step.getId());
        dto.setRecipeId(step.getRecipe() != null ? step.getRecipe().getId() : null);
        dto.setInstructionText(step.getInstructionText());
        dto.setStepNumber(step.getStepNumber());
        return dto;
    }

    public static Step toEntity(StepDTO dto, Recipe recipe) {
        if (dto == null) return null;

        Step step = new Step();
        step.setId(dto.getId());
        step.setRecipe(recipe);
        step.setInstructionText(dto.getInstructionText());
        step.setStepNumber(dto.getStepNumber());
        return step;
    }

    public static List<StepDTO> toDTOList(List<Step> steps) {
        return steps.stream()
                .map(StepMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<Step> toEntityList(List<StepDTO> dtos, Recipe recipe) {
        return dtos.stream()
                .map(dto -> StepMapper.toEntity(dto, recipe))
                .collect(Collectors.toList());
    }
}
