import ToggleFavoritesButton from './ToggleFavoritesButton';

function Favorites ({ favorites }) {
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
                                    <img className="recipe-card-image" alt="nothing added yet :(" src={`data:${recipe.imageType};base64,${recipe.imageData}`} />
                                    <ToggleFavoritesButton recipeId={recipe.id} initialIsFavorite={recipe.favorite} />
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