package com.elinor.recipes.service;

import com.elinor.recipes.dto.PageInfoDTO;
import com.elinor.recipes.dto.RecipeDTO;
import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.User;
import com.elinor.recipes.repository.RecipeRepository;
import com.elinor.recipes.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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
@Transactional
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
        recipe.setIngredients(dto.getIngredients());
        recipe.setMethod(dto.getMethod());
        recipe.setPrepTime(dto.getPrepTime());
        recipe.setCookingTime(dto.getCookingTime());
        recipe.setImageData(dto.getImageData());
        recipe.setImageType(dto.getImageType());
        recipe.setCarbsPerServing(dto.getCarbsPerServing());
        recipe.setProteinPerServing(dto.getProteinPerServing());
        recipe.setFatPerServing(dto.getFatPerServing());
        recipe.setServings(dto.getServings());
        recipe.setUser(user);

        recipeRepository.save(recipe);
    }

    public PageInfoDTO getRecipesCreatedByAnyone(String username, int page, int size) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Recipe> recipePage = recipeRepository.findAll(pageable);

        List<RecipeDTO> recipeDTOList = recipePage.stream()
                .map(recipe -> new RecipeDTO(recipe, user.getFavoriteRecipesList().contains(recipe)))
                .collect(Collectors.toList());

        return new PageInfoDTO(
                recipeDTOList,
                recipePage.getNumber(),
                recipePage.getTotalPages(),
                recipePage.getTotalElements()
        );
    }

    public PageInfoDTO getRecipesCreatedByUser(String username, int page, int size) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Recipe> recipePage = recipeRepository.findByUserUsername(username, pageable);

        List<RecipeDTO> recipeDTOList = recipePage.stream()
                .map(recipe -> new RecipeDTO(recipe, user.getFavoriteRecipesList().contains(recipe)))
                .collect(Collectors.toList());

        return new PageInfoDTO(
                recipeDTOList,
                recipePage.getNumber(),
                recipePage.getTotalPages(),
                recipePage.getTotalElements()
        );
    }

    public RecipeDTO getRecipeById(String username, Long id) {
        if (username == null) {
            throw new UsernameNotFoundException("Username is null");
        }

        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        boolean isFavorite = user.getFavoriteRecipesList().contains(recipe);

        return new RecipeDTO(recipe, isFavorite);
    }
}
