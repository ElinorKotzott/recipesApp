package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.StepDTO;
import com.elinor.recipes.model.Step;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StepMapper {

    StepDTO toDTO(Step step);

    Step toEntity(StepDTO stepDTO);

    List<StepDTO> toDTOList(List<Step> steps);

    List<Step> toEntityList(List<StepDTO> stepDTOs);
}
