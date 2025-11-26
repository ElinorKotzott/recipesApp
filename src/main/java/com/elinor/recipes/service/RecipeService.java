package com.elinor.recipes.service;

import com.elinor.recipes.dto.NutritionInfoDTO;
import com.elinor.recipes.dto.PageInfoDTO;
import com.elinor.recipes.dto.RecipeDTO;
import com.elinor.recipes.dto.RecipeIngredientDTO;
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
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
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

    @Autowired
    private RecipeMapper recipeMapper;

    @Autowired
    private RecipeIngredientMapper recipeIngredientMapper;

    public RecipeDTO createNewRecipe(RecipeDTO dto, String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Recipe recipe = recipeMapper.toEntity(dto);
        recipe.setUser(user);

        if (dto.getServings() != null && dto.getServings() > 0 && dto.getRecipeIngredientList() != null) {


            NutritionInfoDTO nutrition = nutritionService.calculateNutrition(dto.getRecipeIngredientList(), dto.getServings());

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

        RecipeDTO result = recipeMapper.toDTO(recipe);
        result.setFavorite(false);
        return result;
    }


    public PageInfoDTO getRecipesCreatedByAnyone(String username, int page, int size) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Recipe> recipePage = recipeRepository.findAll(pageable);


        List<RecipeDTO> recipeDTOList = recipePage.stream()
                .map(recipe -> recipeMapper.toDTO(recipe))
                .collect(Collectors.toList());

        for (RecipeDTO r : recipeDTOList) {
            r.setFavorite(user.getFavoriteRecipesList().stream().anyMatch(recipe -> recipe.getId().equals(r.getId())));
        }

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
                .map(recipe -> recipeMapper.toDTO(recipe))
                .collect(Collectors.toList());

        for (RecipeDTO r : recipeDTOList) {
            r.setFavorite(user.getFavoriteRecipesList().stream().anyMatch(recipe -> recipe.getId().equals(r.getId())));
        }

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

        RecipeDTO result = recipeMapper.toDTO(recipe);
        result.setFavorite(isFavorite);
        return result;
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
        List<RecipeIngredientDTO> updatedRecipeIngredientList = updatedRecipeDTO.getRecipeIngredientList();
        List<RecipeIngredientDTO> currentRecipeIngredientList = recipeIngredientMapper.toDTOList(recipeIngredientRepository.findById(id).stream().toList());

        if (!areEqual(updatedRecipeIngredientList, currentRecipeIngredientList)) {
            NutritionInfoDTO updatedRecipeNutritionInfoDTO = nutritionService.calculateNutrition(updatedRecipeIngredientList, updatedRecipeDTO.getServings());
            updatedRecipeDTO.setCaloriesPerServing(updatedRecipeNutritionInfoDTO.getCaloriesPerServing());
            updatedRecipeDTO.setCarbsPerServing(updatedRecipeNutritionInfoDTO.getCarbsPerServing());
            updatedRecipeDTO.setFatPerServing(updatedRecipeNutritionInfoDTO.getFatPerServing());
            updatedRecipeDTO.setProteinPerServing(updatedRecipeNutritionInfoDTO.getProteinPerServing());
        }

        Recipe updatedRecipe = recipeMapper.toEntity(updatedRecipeDTO);
        updatedRecipe.setUser(user);
        updatedRecipe.setId(id);
        recipeRepository.save(updatedRecipe);
    }


    public boolean areEqual(List<RecipeIngredientDTO> list1, List<RecipeIngredientDTO> list2) {
        if (list1.size() != list2.size()) return false;

        for (RecipeIngredientDTO dto1 : list1) {
            boolean matchFound = list2.stream().anyMatch(dto2 ->
                    Objects.equals(dto1.getIngredient().getId(), dto2.getIngredient().getId()) &&
                            Objects.equals(dto1.getQuantity(), dto2.getQuantity()) &&
                            dto1.getUnit() == dto2.getUnit()
            );

            if (!matchFound) return false;
        }

        return true;
    }


}
