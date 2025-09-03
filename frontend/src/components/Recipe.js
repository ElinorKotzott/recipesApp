import { Link } from "react-router-dom";
import ToggleFavoritesButton from "./ToggleFavoritesButton";
import Pagination from "./Pagination";

function Recipe({
  allRecipes,
  allCurrentPage,
  allTotalPages,
  fetchAllRecipes,

  userRecipes,
  userCurrentPage,
  userTotalPages,
  fetchUserRecipes,
}) {
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
