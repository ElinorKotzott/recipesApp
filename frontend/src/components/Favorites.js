import ToggleFavoritesButton from './ToggleFavoritesButton';

function Favorites ({ favorites, className, setFavorites }) {

    const handleToggle = (recipeId) => (newFavoriteState) => {
        if (!newFavoriteState) {
            setFavorites(prev => prev.filter(recipe => recipe.id !== recipeId));
        }
    };

    return (
        <div className="favorites-container">
        <div className="recipe-card-container">
                        <h2>Your Favorites</h2>
                        {favorites.length === 0 ? (
                            <p>You haven't added any recipes to your favorites yet.</p>
                        ) : (
                            favorites.map(recipe => (
                                <div key={recipe.id} className="recipe-card">
                                    <h3>{recipe.title}</h3>
                                    <p>{recipe.description}</p>

                                    <div className="image-button-container">
                                        <img
                                            className="recipe-card-image"
                                            alt={recipe.title}
                                            src={
                                            recipe.imageData
                                            ? `data:${recipe.imageType};base64,${recipe.imageData}`
                                            : '/image-placeholder.jpeg'
                                            }
                                        />
                                        <ToggleFavoritesButton className="image-button"
                                            recipeId={recipe.id}
                                            initialIsFavorite={recipe.favorite}
                                            onToggle={handleToggle(recipe.id)}
                                        />
                                    </div>

                                    <div className="tags">
                                        {recipe.tags.map((tag, index) => (
                                            <span key={index} className="tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    </div>

    );
}

export default Favorites;