package com.elinor.recipes.repository;

import com.elinor.recipes.model.Recipe;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Page<Recipe> findAll(@NonNull Pageable pageable);

    Page<Recipe> findByUserUsername(String username, Pageable pageable);
}
