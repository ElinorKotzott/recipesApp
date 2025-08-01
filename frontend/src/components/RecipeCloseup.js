import { request } from '../axiosHelper';
import SubmitButton from './SubmitButton';
import ToggleFavoritesButton from './ToggleFavoritesButton';
import { useNavigate } from 'react-router-dom';

function RecipeCloseup({ recipe, onDelete }) {
    const navigate = useNavigate();
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    const isOwner = currentUser && Number(currentUser.id) === Number(recipe.creatorId);

    const handleDelete = () => {
        request('DELETE', `/recipes/${recipe.id}`)
            .then(() => {
                alert("Recipe deleted");
                navigate(-1);
            })
            .catch(() => alert("An error occurred trying to delete the recipe"));

    };



    return (
        <div className="recipe-closeup">
            <h2>{recipe.title}</h2>
            <p>{recipe.servings ? 'Serves ' + recipe.servings : 'No serving size found'}</p>
            <ToggleFavoritesButton
                className="favorites-button"
                recipeId={recipe.id}
                initialIsFavorite={recipe.favorite}
            />
            <p>{recipe.description}</p>
            <img className="image-closeup"
                src={
                    recipe.imageData
                        ? `data:${recipe.imageType};base64,${recipe.imageData}`
                        : '/image-placeholder.jpeg'
                }
                alt={recipe.title}
            />
            <h3>Prep Time:</h3>
            <p>{recipe.prepTime} min</p>
            <h3>Cooking Time:</h3>
            <p> {recipe.cookingTime} min</p>
            <h3>Ingredients:</h3>
            <ul>
              {recipe.recipeIngredientDTOList && recipe.recipeIngredientDTOList.length > 0 ? (
                recipe.recipeIngredientDTOList.map((item, index) => (
                  <li key={index}>
                    {item.quantity} {item.unit !== "WHOLE" ? item.unit.toLowerCase() + " " : ""}{item.ingredientDTO?.name || 'Unnamed ingredient'}
                  </li>
                ))
              ) : (
                <li>No ingredients found</li>
              )}
            </ul>

            <p>Method: {recipe.method}</p>
            <h3>Nutrition information per serving:</h3>
            <p>Calories: {recipe.caloriesPerServing ? Number(recipe.caloriesPerServing).toFixed(1) : 'No information found'}</p>
            <p>Protein: {recipe.proteinPerServing ? Number(recipe.proteinPerServing).toFixed(1) : 'No information found'}</p>
            <p>Carbohydrates: {recipe.carbsPerServing ? Number(recipe.carbsPerServing).toFixed(1) : 'No information found'}</p>
            <p>Fat: {recipe.fatPerServing ? Number(recipe.fatPerServing).toFixed(1) : 'No information found'}</p>
            <p>Nutrition values are estimated using the Edamam API and may not be fully accurate.</p>

            {isOwner && (
                <SubmitButton
                    onClick={handleDelete}
                    className="delete-button"
                >
                    Delete
                </SubmitButton>
            )}

        </div>
    );
}

export default RecipeCloseup;
