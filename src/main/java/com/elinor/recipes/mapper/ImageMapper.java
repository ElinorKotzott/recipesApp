package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.ImageDTO;
import com.elinor.recipes.model.Image;

import java.util.List;
import java.util.stream.Collectors;


public class ImageMapper {

    public static ImageDTO toDTO (Image image) {
        if (image == null) return null;

        ImageDTO imageDTO = new ImageDTO();
        imageDTO.setImageData(image.getImageData());
        imageDTO.setImageType(image.getImageType());
        imageDTO.setCropParameters(image.getCropParameters());
        return imageDTO;
    }


    public static Image toEntity (ImageDTO imageDTO) {
        if (imageDTO == null) return null;

        Image image = new Image();
        image.setId(imageDTO.getId());
        image.setImageData(imageDTO.getImageData());
        image.setImageType(imageDTO.getImageType());
        image.setCropParameters(imageDTO.getCropParameters());
        return image;
    }

    public static List<ImageDTO> toDTOList(List<Image> Images) {
        return Images.stream()
                .map(ImageMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static List<Image> toEntityList(List<ImageDTO> DTOs) {
        return DTOs.stream()
                .map(ImageMapper::toEntity)
                .collect(Collectors.toList());
    }
}
