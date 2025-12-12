import {request} from "../axiosHelper";
import ToggleFavoritesButton from "./buttons/ToggleFavoritesButton";
import PrimaryButton from "./buttons/PrimaryButton.js";
import {useNavigate} from "react-router-dom";
import DrawImage from "./DrawImage";

function RecipeCloseup({recipe}) {
    const navigate = useNavigate();
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const isOwner = currentUser && Number(currentUser.id) === Number(recipe.creatorId);

    const handleDelete = () => {
        request("DELETE", `/recipes/${recipe.id}`, null, true)
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
            <p>{recipe.description}</p>
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

            <p>difficulty: {recipe.difficulty.toLowerCase()}</p>

            <p>
                {recipe.tagList && recipe.tagList.length > 0
                    ? recipe.tagList.map((tag) => tag.text).join(" | ")
                    : "no tags found"}
            </p>

            <DrawImage
                imageData={recipe.image.imageData}
                imageType={recipe.image.imageType}
                cropParameters={recipe.image.cropParameters} //cropParameters are flat here, not nested! same structure as in backend
                imageStyle={{
                    display: "block",
                    width: "300px",
                    objectFit: "cover",
                    margin: "1rem 0"
                }}
                //className="image-closeup" - would it be better to use className and style that with css instead of passing style?
            />

            <h3>Prep Time:</h3>
            <p>{recipe.prepTime} min</p>
            <h3>Cooking Time:</h3>
            <p> {recipe.cookingTime} min</p>
            <h3>Ingredients:</h3>
            <ul>
                {recipe.recipeIngredientList &&
                recipe.recipeIngredientList.length > 0 ? (
                    recipe.recipeIngredientList.map((item, index) => (
                        <li key={index}>
                            {item.quantity}{" "}
                            {item.unit !== "WHOLE" ? item.unit.toLowerCase() + " " : ""}
                            {item.ingredient?.name.toLowerCase() || "Unnamed ingredient"}
                        </li>
                    ))
                ) : (
                    <li>No ingredients found</li>
                )}
            </ul>

            <h3> Directions:</h3>
            {recipe.stepListUI && recipe.stepListUI.length > 0 ? (
                <ol>
                    {recipe.stepListUI.map((item) => (
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
                Nutrition values aren't accurate. The free version of the API uses 100g of an ingredient, no matter
                which quantity is specified.
            </p>

            <div className="delete-update-buttons-container">
                {isOwner && (
                    <PrimaryButton onClick={handleUpdate} className="update-button">
                        Update
                    </PrimaryButton>
                )}

                {isOwner && (
                    <PrimaryButton onClick={handleDelete} className="delete-button">
                        Delete
                    </PrimaryButton>
                )}
            </div>


        </div>
    );
}

export default RecipeCloseup;
