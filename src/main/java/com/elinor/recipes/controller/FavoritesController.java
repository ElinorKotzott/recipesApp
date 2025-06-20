package com.elinor.recipes.controller;

import com.elinor.recipes.dto.RecipeDTO;
import com.elinor.recipes.dto.UserDTO;
import com.elinor.recipes.service.FavoritesService;
import com.elinor.recipes.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class FavoritesController {

    @Autowired
    private FavoritesService favoritesService;

    @GetMapping("/favorites")
    public ResponseEntity<RecipeDTO> getUsersFavorites(Authentication authentication) {
        String username = authentication.getName();
        FavoritesDTO favorites = favoritesService.getUserProfile(username);


        return ResponseEntity.ok(favorites);

}