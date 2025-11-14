package com.elinor.recipes.mapper;

import com.elinor.recipes.dto.RecipeDTO;
import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.User;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;

@Mapper(
        componentModel = "spring",
        uses = {
                ImageMapper.class,
                RecipeIngredientMapper.class,
                StepMapper.class,
                TagMapper.class
        }
)
public interface RecipeMapper {

    @Mapping(target = "imageDTO", source = "image")
    @Mapping(target = "recipeIngredientDTOList", source = "recipeIngredientList")
    @Mapping(target = "stepDTOList", source = "stepList")
    @Mapping(target = "tagDTOList", source = "tagList")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "favorite", expression = "java(isFavorite)")
    RecipeDTO toDTO(Recipe recipe, @Context boolean isFavorite);

    List<RecipeDTO> toDTOList(List<Recipe> recipes, @Context boolean isFavorite);

    default List<RecipeDTO> toDtoListWithFavorites(List<Recipe> recipes, List<Recipe> favorites) {
        Set<Long> favoriteIds = favorites.stream().map(Recipe::getId).collect(java.util.stream.Collectors.toSet());
        return recipes.stream()
                .map(r -> toDTO(r, favoriteIds.contains(r.getId())))
                .toList();
    }

    @Mapping(target = "user", source = "user")
    @Mapping(target = "image", source = "dto.imageDTO")
    @Mapping(target = "recipeIngredientList", source = "dto.recipeIngredientDTOList")
    @Mapping(target = "stepList", source = "dto.stepDTOList")
    @Mapping(target = "tagList", source = "dto.tagDTOList")
    Recipe toEntity(RecipeDTO dto, @Context User user);

    List<Recipe> toEntityList(List<RecipeDTO> dtos, @Context User user);

    @ObjectFactory
    default Recipe createRecipe(RecipeDTO dto, @Context User user) {
        Recipe recipe = new Recipe();
        recipe.setId(dto.getId());
        recipe.setUser(user);
        return recipe;
    }
}
