package com.elinor.recipes;

import com.elinor.recipes.model.Recipe;
import com.elinor.recipes.model.User;
import com.elinor.recipes.repository.RecipeRepository;
import com.elinor.recipes.repository.UserRepository;
import com.elinor.recipes.service.FavoritesService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.junit.jupiter.api.AfterEach;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

class FavoritesServiceTests {

	@Mock
	private UserRepository userRepository;

	@Mock
	private RecipeRepository recipeRepository;

	@InjectMocks
	private FavoritesService favoritesService;

	private AutoCloseable closeable;

	@BeforeEach
	void setUp() {
		closeable = MockitoAnnotations.openMocks(this);
	}

	@AfterEach
	void tearDown() throws Exception {
		closeable.close();
	}

	@Test
	void toggleFavorite_ThrowsException_whenUserNotFound() {
		when(userRepository.findByUsername("nonExistingUser")).thenReturn(Optional.empty());

		assertThrows(UsernameNotFoundException.class, () ->
				favoritesService.toggleFavorite("nonExistingUser", 1L, true)
		);
	}


	@Test
	void toggleFavorite_ThrowsException_whenRecipeNotFound() {
		User user = new User();
		user.setFavoriteRecipesList(new ArrayList<>());

		when(userRepository.findByUsername("existingUser")).thenReturn(Optional.of(user));
		when(recipeRepository.findById(1L)).thenReturn(Optional.empty());

		assertThrows(RuntimeException.class, () ->
				favoritesService.toggleFavorite("existingUser", 1L, true)
		);
	}

	@Test
	void getFavoriteRecipes_ThrowsException_whenUsernameIsNull() {
		assertThrows(UsernameNotFoundException.class, () -> {
			favoritesService.getFavoriteRecipes(null, 0, 10);
		});
	}

	@Test
	void toggleFavorite_AddsRecipe_whenFavoriteIsTrueAndNotInList() {
		User user = new User();
		user.setFavoriteRecipesList(new ArrayList<>());

		Recipe recipe = new Recipe();
		recipe.setId(1L);

		when(userRepository.findByUsername("existingUser")).thenReturn(Optional.of(user));
		when(recipeRepository.findById(1L)).thenReturn(Optional.of(recipe));

		favoritesService.toggleFavorite("existingUser", 1L, true);

		assert user.getFavoriteRecipesList().contains(recipe);
	}
}
