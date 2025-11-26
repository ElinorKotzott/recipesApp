package com.elinor.recipes.dto;

import com.elinor.recipes.model.enumeration.Unit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecipeIngredientDTO {
    private IngredientDTO ingredient;
    private Double quantity;
    private Unit unit;
}
