package com.elinor.recipes.service;

import com.elinor.recipes.dto.PageInfoDTO;
import com.elinor.recipes.dto.RecipeDTO;
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
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Recipe> recipePage = recipeRepository.findByUserUsername(username, pageable);

        List<RecipeDTO> recipeDTOList = recipePage.stream()
                .filter(recipe -> user.getFavoriteRecipesList().contains(recipe))
                .map(recipe -> new RecipeDTO(recipe, true))
                .collect(Collectors.toList());

        return new PageInfoDTO(
                recipeDTOList,
                recipePage.getNumber(),
                recipePage.getTotalPages(),
                recipePage.getTotalElements()
        );
    }

}
