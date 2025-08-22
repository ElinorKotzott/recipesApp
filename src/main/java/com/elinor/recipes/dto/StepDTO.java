package com.elinor.recipes.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StepDTO {
    private Long recipeId;
    private String instructionText;
    private Integer stepNumber;
}
