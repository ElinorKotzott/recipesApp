function Recipe({ allRecipes, userRecipes }) {
    return (
    <div className="recipes-container">
        <div className="recipe-card-container">
            {recipes.length === 0 ? (
                <p>Nothing to see here yet.</p>
            ) : (
                <ul>
                    {allRecipes.map(recipe => (
                        <li key={recipe.id}>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                            <div className="tags">
                                {recipe.tags.map((tag, index) => (
                                    <span key={index} className="tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <div className="recipe-card-container">
                    {userRecipes.length === 0 ? (
                        <p>Nothing to see here yet.</p>
                    ) : (
                        <ul>
                            {userRecipes.map(recipe => (
                                <li key={recipe.id}>
                                    <h3>{recipe.title}</h3>
                                    <p>{recipe.description}</p>
                                    <div className="tags">
                                        {recipe.tags.map((tag, index) => (
                                            <span key={index} className="tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
        </div>
    );
}

export default Recipe;