import {Link} from "react-router-dom";
import ToggleFavoritesButton from "./buttons/ToggleFavoritesButton";
import Pagination from "./Pagination";
import DrawImage from "./DrawImage";

function Favorites({
                       favorites,
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
                                <div className="favorite-button-container">
                                    <Link to={`/recipes/${recipe.id}`}>
                                        {recipe.image?.imageData ? (
                                            <DrawImage
                                                imageData={recipe.image.imageData}
                                                imageType={recipe.image.imageType}
                                                cropParameters={recipe.image.cropParameters}
                                                imageStyle={{
                                                    display: "block",
                                                    width: "200px",
                                                    aspectRatio: 3 / 4,
                                                    objectFit: "cover",
                                                    margin: "1rem 0"
                                                }}
                                                className="recipe-card-image"
                                            />
                                        ) : (
                                            <img
                                                className="recipe-card-image"
                                                alt={recipe.title}
                                                src="/image-placeholder.jpeg"
                                                style={{
                                                    display: "block",
                                                    width: "200px",
                                                    objectFit: "cover",
                                                    margin: "1rem 0"
                                                }}
                                            />
                                        )}

                                    </Link>

                                    <ToggleFavoritesButton
                                        className="favorite-button"
                                        recipeId={recipe.id}
                                        initialIsFavorite={recipe.favorite}
                                        onToggle={handleToggle(recipe.id)}
                                    />

                                    <h3>
                                        <Link to={`/recipes/${recipe.id}`} className="card-link">
                                            {recipe.title}
                                        </Link>
                                    </h3>

                                    <p>{recipe.description}</p>
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
