package com.elinor.recipes.dto;

import com.elinor.recipes.model.CropParameters;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageDTO {
    private Long id;
    private String imageData;
    private String imageType;
    private CropParameters cropParameters;
}
