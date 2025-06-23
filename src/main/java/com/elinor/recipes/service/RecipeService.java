package com.elinor.recipes.service;

import com.elinor.recipes.dto.RecipeDTO;
import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.User;
import com.elinor.recipes.repository.RecipeRepository;
import com.elinor.recipes.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    public void createNewRecipe(RecipeDTO dto, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Recipe recipe = new Recipe();
        recipe.setTitle(dto.getTitle());
        recipe.setDescription(dto.getDescription());
        recipe.setPrepTime(dto.getPrepTime());
        recipe.setCookingTime(dto.getCookingTime());
        recipe.setImageData(dto.getImageData());
        recipe.setImageType(dto.getImageType());
        recipe.setUser(user);

        recipeRepository.save(recipe);
    }

    public List<RecipeDTO> getRecipesCreatedByAnyone(int page, int size, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Recipe> recipePage = recipeRepository.findAll(pageable);
        return recipePage.stream().map(recipe -> new RecipeDTO(recipe, user.getFavoriteRecipesList().contains(recipe))).collect(Collectors.toList());
    }

    public List<RecipeDTO> getRecipesCreatedByUser(String username, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Recipe> recipePage = recipeRepository.findByUserUsername(username, pageable);
        return recipePage.stream().map(recipe -> new RecipeDTO(recipe, true)).collect(Collectors.toList());
    }
}
