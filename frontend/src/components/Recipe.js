import ToggleFavoritesButton from './ToggleFavoritesButton';
import Pagination from './Pagination';

function Recipe({
    allRecipes,
    allCurrentPage,
    allTotalPages,
    fetchAllRecipes,

    userRecipes,
    userCurrentPage,
    userTotalPages,
    fetchUserRecipes
}) {
    return (
        <div className="recipes-container">
            <div className="recipe-card-container">
                <h2>Latest Uploads</h2>
                <div className="latest-recipes">
                {allRecipes.length === 0 ? (
                    <p>Nothing to see here yet.</p>
                ) : (
                    allRecipes.map(recipe => (
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
                                <ToggleFavoritesButton className="image-button" recipeId={recipe.id} initialIsFavorite={recipe.favorite} />
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
                 <Pagination className="pagination"
                     currentPage={allCurrentPage}
                     totalPages={allTotalPages}
                     fetchRecipes={fetchAllRecipes}
                 />
            </div>


            <div className="your-recipes">
            <div className="recipe-card-container">
                <h2>Your Recipes</h2>
                {userRecipes.length === 0 ? (
                    <p>You haven't created any recipes yet.</p>
                ) : (
                    userRecipes.map(recipe => (
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
                                <ToggleFavoritesButton className="image-button" recipeId={recipe.id} initialIsFavorite={recipe.favorite} />
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
            <Pagination className="pagination"
                currentPage={userCurrentPage}
                totalPages={userTotalPages}
                fetchRecipes={fetchUserRecipes}
            />
        </div>
    );
}

export default Recipe;
