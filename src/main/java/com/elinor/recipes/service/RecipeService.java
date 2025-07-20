package com.elinor.recipes.service;

import com.elinor.recipes.dto.NutritionInfoDTO;
import com.elinor.recipes.dto.PageInfoDTO;
import com.elinor.recipes.dto.RecipeDTO;
import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.User;
import com.elinor.recipes.repository.RecipeRepository;
import com.elinor.recipes.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NutritionService nutritionService;

    public RecipeDTO createNewRecipe(RecipeDTO dto, String username) {

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
        recipe.setServings(dto.getServings());
        recipe.setUser(user);

        if (dto.getServings() != null && dto.getServings() > 0 && dto.getIngredients() != null) {
            List<String> ingredients = Arrays.stream(dto.getIngredients().split(","))
                    .map(String::trim)
                    .toList();

            NutritionInfoDTO nutrition = nutritionService.calculateNutrition(ingredients, dto.getServings());

            recipe.setProteinPerServing(nutrition.getProteinPerServing());
            recipe.setCarbsPerServing(nutrition.getCarbsPerServing());
            recipe.setFatPerServing(nutrition.getFatPerServing());
            recipe.setCaloriesPerServing(nutrition.getCaloriesPerServing());
        } else {
            recipe.setProteinPerServing(null);
            recipe.setCarbsPerServing(null);
            recipe.setFatPerServing(null);
            recipe.setCaloriesPerServing(null);
        }

        recipeRepository.save(recipe);
        return convertToDTO(recipe);
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

    public void deleteRecipe(String currentUsername, Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found"));
        if (!recipe.getUser().getUsername().equals(currentUsername)) {
            throw new EntityNotFoundException("Recipe not found");
        }

        recipeRepository.delete(recipe);
    }

    private RecipeDTO convertToDTO(Recipe recipe) {
        RecipeDTO dto = new RecipeDTO();
        dto.setId(recipe.getId());
        dto.setTitle(recipe.getTitle());
        dto.setDescription(recipe.getDescription());
        dto.setIngredients(recipe.getIngredients());
        dto.setMethod(recipe.getMethod());
        dto.setPrepTime(recipe.getPrepTime());
        dto.setCookingTime(recipe.getCookingTime());
        dto.setImageData(recipe.getImageData());
        dto.setImageType(recipe.getImageType());
        dto.setCarbsPerServing(recipe.getCarbsPerServing());
        dto.setProteinPerServing(recipe.getProteinPerServing());
        dto.setFatPerServing(recipe.getFatPerServing());
        dto.setServings(recipe.getServings());
        dto.setCreatorId(recipe.getUser().getId());
        return dto;
    }

}
