package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.CropParametersDTO;
import com.elinor.recipes.model.CropParameters;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CropParametersMapper {

    CropParametersDTO toDTO(CropParameters entity);

    CropParameters toEntity(CropParametersDTO dto);
}
