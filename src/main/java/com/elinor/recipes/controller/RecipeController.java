package com.elinor.recipes.controller;

import com.elinor.recipes.dto.RecipeDTO;
import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.User;
import com.elinor.recipes.repository.UserRepository;
import com.elinor.recipes.service.RecipeService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<RecipeDTO> createNewRecipe(
            @RequestBody RecipeDTO newRecipe,
            Authentication authentication) {
        String currentUsername = authentication.getName();
        RecipeDTO createdRecipe = recipeService.createNewRecipe(newRecipe, currentUsername);
        return ResponseEntity.status(201).body(createdRecipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserRecipe(
            Authentication authentication,
            @PathVariable("id") Long recipeId) {
        String currentUsername = authentication.getName();
        recipeService.deleteRecipe(currentUsername, recipeId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUserRecipe(
            @PathVariable Long id,
            @RequestBody RecipeDTO updatedRecipeDTO,
            Authentication authentication) {

        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        try {
            recipeService.updateRecipe(id, updatedRecipeDTO, user);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("An error occurred trying to update the recipe: " + ex.getMessage());
        }
    }

}
