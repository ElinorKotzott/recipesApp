package com.elinor.recipes.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class CropParametersDTO {
    private Long id;
    private Double x;
    private Double y;
    private Double width;
    private Double height;
    private Double zoom;

    @JsonProperty("xForCropper")
    private Double xForCropper;

    @JsonProperty("yForCropper")
    private Double yForCropper;
}
