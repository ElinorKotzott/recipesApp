package com.elinor.recipes.service;

import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.User;
import com.elinor.recipes.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoritesService {

    @Autowired
    private UserRepository userRepository;

    public List<Recipe> getFavoriteRecipes(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return user.getFavoriteRecipesList();
    }
}
