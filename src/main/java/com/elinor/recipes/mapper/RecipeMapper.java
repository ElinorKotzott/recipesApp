package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.IngredientDTO;
import com.elinor.recipes.dto.RecipeDTO;
import com.elinor.recipes.model.Ingredient;
import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.User;

import java.util.List;
import java.util.stream.Collectors;

public class RecipeMapper {

    public static RecipeDTO toDTO(Recipe recipe, boolean isFavorite) {

        return new RecipeDTO(
                recipe.getId(),
                recipe.getTitle(),
                recipe.getDescription(),
                recipe.getPrepTime(),
                recipe.getCookingTime(),
                recipe.getImageData(),
                recipe.getImageType(),
                RecipeIngredientMapper.toDTOList(recipe.getRecipeIngredientList()),
                recipe.getMethod(),
                //recipe.getTagList().stream().map(Tag::getText).collect(Collectors.toList()),
                isFavorite,
                recipe.getProteinPerServing(),
                recipe.getCarbsPerServing(),
                recipe.getFatPerServing(),
                recipe.getServings(),
                recipe.getCaloriesPerServing(),
                recipe.getUser().getId()
        );
    }

    public static Recipe toEntity(RecipeDTO dto, User user) {

        Recipe recipe = new Recipe();
        recipe.setId(dto.getId());
        recipe.setTitle(dto.getTitle());
        recipe.setDescription(dto.getDescription());
        recipe.setMethod(dto.getMethod());
        recipe.setPrepTime(dto.getPrepTime());
        recipe.setCookingTime(dto.getCookingTime());
        recipe.setImageData(dto.getImageData());
        recipe.setImageType(dto.getImageType());
        recipe.setRecipeIngredientList(RecipeIngredientMapper.toEntityList(dto.getRecipeIngredientDTOList(), recipe));
        recipe.setServings(dto.getServings());
        recipe.setUser(user);
        return recipe;
    }

    public static List<RecipeDTO> toDTOList(List<Recipe> recipeList, boolean isFavorite) {
        return recipeList.stream()
                .map(recipe -> toDTO(recipe, isFavorite))
                .collect(Collectors.toList());
    }

    public static List<RecipeDTO> toDTOList(List<Recipe> recipeList, List<Recipe> favoriteRecipeList) {
        return recipeList.stream()
                .map(recipe -> toDTO(recipe, favoriteRecipeList.contains(recipe)))
                .collect(Collectors.toList());
    }


    public static List<Recipe> toEntityList(List<RecipeDTO> dtos, User user) {
        return dtos.stream()
                .map(dto -> toEntity(dto, user))
                .collect(Collectors.toList());
    }



}
