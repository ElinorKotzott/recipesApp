package com.elinor.recipes.repository;

import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}

