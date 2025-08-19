package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.TagDTO;
import com.elinor.recipes.model.Tag;
import java.util.List;
import java.util.stream.Collectors;

public class TagMapper {

    public static TagDTO toDTO(Tag tag) {
        if (tag == null) return null;

        TagDTO dto = new TagDTO();
        dto.setId(tag.getId());
        dto.setText(tag.getText());
        return dto;
    }

    public static Tag toEntity(TagDTO dto) {
        if (dto == null) return null;

        Tag tag = new Tag();
        tag.setId(dto.getId());
        tag.setText(dto.getText());
        return tag;
    }

    public static List<TagDTO> toDTOList(List<Tag> tags) {
        return tags.stream()
                .map(TagMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<Tag> toEntityList(List<TagDTO> dtos) {
        return dtos.stream()
                .map(TagMapper::toEntity)
                .collect(Collectors.toList());
    }
}
