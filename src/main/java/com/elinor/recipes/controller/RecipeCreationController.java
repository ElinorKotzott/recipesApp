package com.elinor.recipes.controller;

import com.elinor.recipes.dto.RecipeDTO;
import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.User;
import com.elinor.recipes.repository.RecipeRepository;
import com.elinor.recipes.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;


@RestController
public class RecipeCreationController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createNewRecipe(@RequestBody RecipeDTO newRecipe, Authentication authentication) {
        String currentUsername = authentication.getName();

        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Recipe recipe = new Recipe();
        recipe.setTitle(newRecipe.getTitle());
        recipe.setDescription(newRecipe.getDescription());
        recipe.setPrepTime(newRecipe.getPrepTime());
        recipe.setCookingTime(newRecipe.getCookingTime());
        recipe.setUser(user);

        recipeRepository.save(recipe);

        return ResponseEntity.ok().build();
    }
}
