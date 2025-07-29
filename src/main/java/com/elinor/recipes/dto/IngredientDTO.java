package com.elinor.recipes.dto;

import com.elinor.recipes.model.Ingredient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class IngredientDTO {
    private Long id;
    private String name;

    public IngredientDTO(Ingredient ingredient) {
        this.id = ingredient.getId();
        this.name = ingredient.getName();
    }

    public static List<IngredientDTO> toDTOList(List<Ingredient> ingredientList) {
        List<IngredientDTO> tmp = new ArrayList<>();
        for (Ingredient i : ingredientList) {
            tmp.add(new IngredientDTO(i));
        }
        return tmp;
    }
}
