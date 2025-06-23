package com.elinor.recipes.service;

import com.elinor.recipes.dto.RecipeDTO;
import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.User;
import com.elinor.recipes.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoritesService {

    @Autowired
    private UserRepository userRepository;

    public List<RecipeDTO> getFavoriteRecipes(String username) {
        User user = userRepository.findByUsernameWithFavorites(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<Recipe> recipes = user.getFavoriteRecipesList();

        return recipes.stream().map(recipe -> new RecipeDTO(recipe)).collect(Collectors.toList());
    }
}
