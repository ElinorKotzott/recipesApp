package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.ImageDTO;
import com.elinor.recipes.model.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CropParametersMapper.class})
public interface ImageMapper {

    ImageDTO toDTO(Image image);

    Image toEntity(ImageDTO dto);

    List<ImageDTO> toDTOList(List<Image> images);

    List<Image> toEntityList(List<ImageDTO> dtos);

    @Mapping(target = "id", ignore = true)
    void updateEntity(ImageDTO dto, @MappingTarget Image entity);
}
