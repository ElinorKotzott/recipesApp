import { request } from "../axiosHelper";
import ToggleFavoritesButton from "./ToggleFavoritesButton";
import PrimaryButton from "./buttons/PrimaryButton.js";
import { useNavigate } from "react-router-dom";

function RecipeCloseup({ recipe, onDelete }) {
  const navigate = useNavigate();
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const isOwner =
    currentUser && Number(currentUser.id) === Number(recipe.creatorId);

  const handleDelete = () => {
    request("DELETE", `/recipes/${recipe.id}`)
      .then(() => {
        alert("Recipe deleted");
        navigate("/home");
      })
      .catch(() => alert("An error occurred trying to delete the recipe"));
  };

  const handleUpdate = () => {
    navigate(`/recipes/update/${recipe.id}`);
  };

  return (
    <div className="recipe-closeup">
      <h2>{recipe.title}</h2>
      <p>
        {recipe.servings
          ? "Serves " + recipe.servings
          : "No serving size found"}
      </p>
      <ToggleFavoritesButton
        className="favorite-button"
        recipeId={recipe.id}
        initialIsFavorite={recipe.favorite}
      />
      <p>{recipe.description}</p>
      <p>
        {recipe.tagDTOList && recipe.tagDTOList.length > 0
          ? recipe.tagDTOList.map((tag) => tag.text).join(" | ")
          : "no tags found"}
      </p>
      <img
        className="image-closeup"
        src={
          recipe.imageData
            ? `data:${recipe.imageType};base64,${recipe.imageData}`
            : "/image-placeholder.jpeg"
        }
        alt={recipe.title}
      />
      <h3>Prep Time:</h3>
      <p>{recipe.prepTime} min</p>
      <h3>Cooking Time:</h3>
      <p> {recipe.cookingTime} min</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.recipeIngredientDTOList &&
        recipe.recipeIngredientDTOList.length > 0 ? (
          recipe.recipeIngredientDTOList.map((item, index) => (
            <li key={index}>
              {item.quantity}{" "}
              {item.unit !== "WHOLE" ? item.unit.toLowerCase() + " " : ""}
              {item.ingredientDTO?.name.toLowerCase() || "Unnamed ingredient"}
            </li>
          ))
        ) : (
          <li>No ingredients found</li>
        )}
      </ul>

      <h3> Directions:</h3>
      {recipe.stepsList && recipe.stepsList.length > 0 ? (
        <ol>
          {recipe.stepsList.map((item) => (
            <li key={item.id}>
              {item.instructionText}
            </li>
          ))}
        </ol>
      ) : (
        <p>No directions found for this recipe!</p>
      )}

      <h3>Nutrition information per serving:</h3>
      <p>
        Calories:{" "}
        {recipe.caloriesPerServing
          ? Number(recipe.caloriesPerServing).toFixed(1)
          : "No information found"}
      </p>
      <p>
        Protein:{" "}
        {recipe.proteinPerServing
          ? Number(recipe.proteinPerServing).toFixed(1)
          : "No information found"}
      </p>
      <p>
        Carbohydrates:{" "}
        {recipe.carbsPerServing
          ? Number(recipe.carbsPerServing).toFixed(1)
          : "No information found"}
      </p>
      <p>
        Fat:{" "}
        {recipe.fatPerServing
          ? Number(recipe.fatPerServing).toFixed(1)
          : "No information found"}
      </p>
      <p>
        Nutrition values are estimated using the Edamam API and may not be fully
        accurate (they aren't accurate. The free version of the API uses 100g of an ingredient, no matter
        which quantity is specified).
      </p>

      {isOwner && (
        <PrimaryButton onClick={handleDelete} className="delete-button">
          Delete
        </PrimaryButton>
      )}

      {isOwner && (
        <PrimaryButton onClick={handleUpdate} className="update-button">
          Update
        </PrimaryButton>
      )}
    </div>
  );
}

export default RecipeCloseup;
