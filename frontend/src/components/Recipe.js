function Recipe({ recipes }) {
    return (
        <div className="recipe-card-container">
            {recipes.length === 0 ? (
                <p>Nothing to see here yet.</p>
            ) : (
                <ul>
                    {recipes.map(recipe => (
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
    );
}

export default Recipe;