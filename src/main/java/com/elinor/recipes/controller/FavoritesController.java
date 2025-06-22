package com.elinor.recipes.controller;


import com.elinor.recipes.dto.RecipeDTO;
import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.service.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FavoritesController {

    @Autowired
    private FavoritesService favoritesService;

    @GetMapping("/favorites")
    public ResponseEntity<List<RecipeDTO>> getUsersFavorites(Authentication authentication) {
        String username = authentication.getName();
        List<Recipe> favorites = favoritesService.getFavoriteRecipes(username);

        return ResponseEntity.ok(favorites);
    }
}