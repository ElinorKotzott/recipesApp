package com.elinor.recipes.repository;

import com.elinor.recipes.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @Modifying
    @Query(value = "DELETE FROM favorite_recipes WHERE recipe_id = :recipeId", nativeQuery = true)
    void deleteFavoriteConnectionsByRecipeId(@Param("recipeId") Long recipeId);
}
