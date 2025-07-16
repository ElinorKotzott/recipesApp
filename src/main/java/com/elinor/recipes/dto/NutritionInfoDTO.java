package com.elinor.recipes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NutritionInfoDTO {
    private Double proteinPerServing;
    private Double carbsPerServing;
    private Double fatPerServing;
    private Double caloriesPerServing;
}
