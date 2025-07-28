package com.elinor.recipes.repository;

import com.elinor.recipes.model.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeIngredientRepository  extends JpaRepository<RecipeIngredient, Long> {
}
