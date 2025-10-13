import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ToggleFavoritesButton from "./buttons/ToggleFavoritesButton";
import Pagination from "./Pagination";

function Recipe({
  allRecipes,
    setAllRecipes,
    allCurrentPage,
    allTotalPages,
    fetchAllRecipes,

    userRecipes,
    setUserRecipes,
    userCurrentPage,
    userTotalPages,
    fetchUserRecipes,
}) {

  const handleFavoriteToggle = (recipeId) => (newFavoriteState) => {
    const updateFavoriteStatus = (recipes) =>
      recipes.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, favorite: newFavoriteState } : recipe
      );

    setAllRecipes((prev) => updateFavoriteStatus(prev));
    setUserRecipes((prev) => updateFavoriteStatus(prev));
  };

  return (
    <div className="recipes-container">
      <div className="recipe-card-container">
        <h2>Latest Uploads</h2>
        <div className="latest-recipes">
          {allRecipes.length === 0 ? (
            <p>Nothing to see here yet.</p>
          ) : (
            allRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <div className="favorite-button-container">
                  <Link to={`/recipes/${recipe.id}`}>
                    <img
                      className="recipe-card-image"
                      alt={recipe.title}
                      src={
                        recipe.imageData
                          ? `data:${recipe.imageType};base64,${recipe.imageData}`
                          : "/image-placeholder.jpeg"
                      }
                    />
                  </Link>

                  <ToggleFavoritesButton
                    className="favorite-button"
                    recipeId={recipe.id}
                    initialIsFavorite={recipe.favorite}
                    onToggle={handleFavoriteToggle(recipe.id)}
                  />
                </div>

                <h3>
                  <Link to={`/recipes/${recipe.id}`} className="card-link">
                    {recipe.title}
                  </Link>
                </h3>

                <p>{recipe.description}</p>
              </div>
            ))
          )}
        </div>

        <Pagination
          className="pagination"
          currentPage={allCurrentPage}
          totalPages={allTotalPages}
          fetchRecipes={fetchAllRecipes}
        />
      </div>

      <div className="recipe-card-container">
        <h2>Your Recipes</h2>
        <div className="your-recipes">
          {userRecipes.length === 0 ? (
            <p>You haven't created any recipes yet.</p>
          ) : (
            userRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <div className="favorite-button-container">
                  <Link to={`/recipes/${recipe.id}`}>
                    <img
                      className="recipe-card-image"
                      alt={recipe.title}
                      src={
                        recipe.imageData
                          ? `data:${recipe.imageType};base64,${recipe.imageData}`
                          : "/image-placeholder.jpeg"
                      }
                    />
                  </Link>

                  <ToggleFavoritesButton
                    className="favorite-button"
                    recipeId={recipe.id}
                    initialIsFavorite={recipe.favorite}
                    onToggle={handleFavoriteToggle(recipe.id)}
                  />
                </div>
                <h3>
                  <Link to={`/recipes/${recipe.id}`} className="card-link">
                    {recipe.title}
                  </Link>
                </h3>

                <p>{recipe.description}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <Pagination
        className="pagination"
        currentPage={userCurrentPage}
        totalPages={userTotalPages}
        fetchRecipes={fetchUserRecipes}
      />
    </div>
  );
}

export default Recipe;
