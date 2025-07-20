package com.elinor.recipes.controller;

import com.elinor.recipes.dto.RecipeDTO;
import com.elinor.recipes.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

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
}
