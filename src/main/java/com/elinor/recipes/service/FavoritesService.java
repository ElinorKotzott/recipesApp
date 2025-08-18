package com.elinor.recipes.service;

import com.elinor.recipes.dto.PageInfoDTO;
import com.elinor.recipes.dto.RecipeDTO;
import com.elinor.recipes.mapper.RecipeMapper;
import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.User;
import com.elinor.recipes.repository.RecipeRepository;
import com.elinor.recipes.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FavoritesService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    public PageInfoDTO getFavoriteRecipes(String username, int page, int size) {
        if (username == null) {
            throw new UsernameNotFoundException("Username is null!");
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Page<Recipe> recipePage = recipeRepository.findFavoriteRecipesByUsername(username, pageable);

        List<RecipeDTO> recipeDTOList = RecipeMapper.toDTOList(recipePage.stream().toList(), true);

        return new PageInfoDTO(
                recipeDTOList,
                recipePage.getNumber(),
                recipePage.getTotalPages(),
                recipePage.getTotalElements()
        );
    }


    public void toggleFavorite(String username, Long recipeId, boolean updatedFavoriteState) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        if (updatedFavoriteState) {
            if (!user.getFavoriteRecipesList().contains(recipe)) {
                user.getFavoriteRecipesList().add(recipe);
            }
        } else {
            user.getFavoriteRecipesList().remove(recipe);
        }
        userRepository.save(user);


    }

}
