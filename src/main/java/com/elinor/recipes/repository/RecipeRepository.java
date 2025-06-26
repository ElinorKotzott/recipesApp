package com.elinor.recipes.repository;

import com.elinor.recipes.model.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Page<Recipe> findAll(Pageable pageable);

    Page<Recipe> findByUserUsername(String username, Pageable pageable);

    @Query("SELECT r FROM User u JOIN u.favoriteRecipesList r WHERE u.username = :username")
    Page<Recipe> findFavoriteRecipesByUsername(String username, Pageable pageable);
}
