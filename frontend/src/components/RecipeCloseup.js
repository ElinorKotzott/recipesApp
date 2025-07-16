function RecipeCloseup({ recipe }) {
    return (
        <div className="recipe-closeup">
            <h2>{recipe.title}</h2>
            <p>{recipe.servings ? 'Serves ' + recipe.servings : 'No serving size found'}</p>
            <p>{recipe.description}</p>
            <img className="image-closeup"
                src={
                    recipe.imageData
                        ? `data:${recipe.imageType};base64,${recipe.imageData}`
                        : '/image-placeholder.jpeg'
                }
                alt={recipe.title}
            />
            <p>Prep Time: {recipe.prepTime} min</p>
            <p>Cooking Time: {recipe.cookingTime} min</p>
            <p>Ingredients: {recipe.ingredients}</p>
            <p>Method: {recipe.method}</p>
            <h3>Nutrition information per serving:</h3>
            <p>Calories: {recipe.caloriesPerServing ? Number(recipe.caloriesPerServing).toFixed(1) : 'No information found'}</p>
            <p>Protein: {recipe.proteinPerServing ? Number(recipe.proteinPerServing).toFixed(1) : 'No information found'}</p>
            <p>Carbohydrates: {recipe.carbsPerServing ? Number(recipe.carbsPerServing).toFixed(1) : 'No information found'}</p>
            <p>Fat: {recipe.fatPerServing ? Number(recipe.fatPerServing).toFixed(1) : 'No information found'}</p>
            <p>Nutrition values are estimated using the Edamam API and may not be fully accurate.</p>

        </div>
    );
}

export default RecipeCloseup;
