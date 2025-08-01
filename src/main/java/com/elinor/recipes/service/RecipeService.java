package com.elinor.recipes.service;

import com.elinor.recipes.dto.RecipeIngredientDTO;
import com.elinor.recipes.dto.NutritionInfoDTO;
import com.elinor.recipes.dto.PageInfoDTO;
import com.elinor.recipes.dto.RecipeDTO;
import com.elinor.recipes.mapper.RecipeIngredientMapper;
import com.elinor.recipes.mapper.RecipeMapper;
import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.User;
import com.elinor.recipes.repository.RecipeIngredientRepository;
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

    @Autowired
    private RecipeIngredientRepository recipeIngredientRepository;

    @Autowired
    private NutritionService nutritionService;

    public RecipeDTO createNewRecipe(RecipeDTO dto, String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Recipe recipe = RecipeMapper.toEntity(dto, user);

        if (dto.getServings() != null && dto.getServings() > 0 && dto.getRecipeIngredientDTOList() != null) {


            NutritionInfoDTO nutrition = nutritionService.calculateNutrition(dto.getRecipeIngredientDTOList(), dto.getServings());

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

        createNewRecipeIngredientList(dto, recipe);

        return RecipeMapper.toDTO(recipe, false);
    }

    private void createNewRecipeIngredientList(RecipeDTO dto, Recipe recipe) {
        for (RecipeIngredientDTO i : dto.getRecipeIngredientDTOList()) {
            recipeIngredientRepository.save(RecipeIngredientMapper.toEntity(i, recipe));
        }
    }

    public PageInfoDTO getRecipesCreatedByAnyone(String username, int page, int size) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Recipe> recipePage = recipeRepository.findAll(pageable);


        List<RecipeDTO> recipeDTOList = recipePage.stream()
                .map(recipe -> RecipeMapper.toDTO(recipe, user.getFavoriteRecipesList().contains(recipe)))
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
                .map(recipe -> RecipeMapper.toDTO(recipe, user.getFavoriteRecipesList().contains(recipe)))
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

        return RecipeMapper.toDTO(recipe, isFavorite);

    }

    public void deleteRecipe(String currentUsername, Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found"));
        if (!recipe.getUser().getUsername().equals(currentUsername)) {
            throw new EntityNotFoundException("Recipe not found");
        }

        recipeRepository.delete(recipe);
    }

    public void updateRecipe(Long id, RecipeDTO updatedRecipeDTO, User user) {
        Recipe updatedRecipe = RecipeMapper.toEntity(updatedRecipeDTO, user);
        updatedRecipe.setId(id);

        recipeRepository.save(updatedRecipe);
    }
}
