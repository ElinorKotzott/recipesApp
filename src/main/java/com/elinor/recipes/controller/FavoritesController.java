package com.elinor.recipes.controller;

import com.elinor.recipes.dto.PageInfoDTO;
import com.elinor.recipes.service.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class FavoritesController {

    @Autowired
    private FavoritesService favoritesService;

    @GetMapping("/favorites")
    public ResponseEntity<PageInfoDTO> getUserRecipesPage(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        String username = authentication.getName();
        return ResponseEntity.ok(favoritesService.getFavoriteRecipes(username, page, size));
    }
}