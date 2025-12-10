package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.TagDTO;
import com.elinor.recipes.model.Tag;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {

    TagDTO toDTO(Tag tag);

    Tag toEntity(TagDTO tagDTO);

    List<TagDTO> toDTOList(List<Tag> tagList);

    List<Tag> toEntityList(List<TagDTO> tagDTOList);
}
