package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.CropParametersDTO;
import com.elinor.recipes.model.CropParameters;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CropParametersMapper {

    CropParametersDTO toDTO(CropParameters entity);

    CropParameters toEntity(CropParametersDTO dto);

    @Mapping(target = "id", ignore = true)
    void updateEntity(CropParametersDTO dto, @MappingTarget CropParameters entity);
}
