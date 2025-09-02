import { Link } from "react-router-dom";
import ToggleFavoritesButton from "./ToggleFavoritesButton";
import Pagination from "./Pagination";

function Favorites({
  favorites,
  className,
  setFavorites,
  fetchFavorites,
  currentPage,
  totalPages,
}) {
  const handleToggle = (recipeId) => (newFavoriteState) => {
    if (!newFavoriteState) {
      setFavorites((prev) => prev.filter((recipe) => recipe.id !== recipeId));
    }
  };

  return (
    <div className="favorites-container">
      <div className="recipe-card-container">
        <h2>Your Favorites</h2>
        <div className="your-favs-container">
          {favorites.length === 0 ? (
            <p>You haven't added any recipes to your favorites yet.</p>
          ) : (
            favorites.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <h3>
                  <Link to={`/recipes/${recipe.id}`} className="card-link">
                    {recipe.title}
                  </Link>
                </h3>

                <p>{recipe.description}</p>

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
                    onToggle={handleToggle(recipe.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <Pagination
          className="pagination"
          fetchRecipes={fetchFavorites}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default Favorites;
