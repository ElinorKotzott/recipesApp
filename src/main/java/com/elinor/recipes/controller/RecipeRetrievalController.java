package com.elinor.recipes.controller;

import com.elinor.recipes.dto.PageInfoDTO;
import com.elinor.recipes.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecipeRetrievalController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/recipes")
    public ResponseEntity<PageInfoDTO> getRecipesPage(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        String username = authentication.getName();
        return ResponseEntity.ok(recipeService.getRecipesCreatedByAnyone(username, page, size));
    }

    @GetMapping("/recipes/mine")
    public ResponseEntity<PageInfoDTO> getUserRecipes(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        String username = authentication.getName();
        return ResponseEntity.ok(recipeService.getRecipesCreatedByUser(username, page, size));
    }
}
