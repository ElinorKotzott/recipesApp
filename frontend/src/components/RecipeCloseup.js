function RecipeCloseup({ recipe }) {
    return (
        <div className="recipe-closeup">
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <img
                src={
                    recipe.imageData
                        ? `data:${recipe.imageType};base64,${recipe.imageData}`
                        : '/image-placeholder.jpeg'
                }
                alt={recipe.title}
            />
            <p>Prep Time: {recipe.prepTime} min</p>
            <p>Cooking Time: {recipe.cookingTime} min</p>

            <div className="tags">
                {recipe.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                ))}
            </div>
        </div>
    );
}

export default RecipeCloseup;
