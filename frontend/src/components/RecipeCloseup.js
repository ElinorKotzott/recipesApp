import {request} from "../axiosHelper";
import ToggleFavoritesButton from "./buttons/ToggleFavoritesButton";
import PrimaryButton from "./buttons/PrimaryButton.js";
import {useNavigate} from "react-router-dom";
import DrawImage from "./DrawImage";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/esm/Modal";
import {useState} from "react";

function RecipeCloseup({recipe}) {
    const navigate = useNavigate();
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const isOwner = currentUser && Number(currentUser.id) === Number(recipe.creatorId);

    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = () => {
        setShowDelete(true);
    };

    const handleCloseDelete = () => setShowDelete(false);

    const handleDelete = () => {
        console.log("Recipe ID:", recipe?.id);
        console.log("User in session:", sessionStorage.getItem("user"));
        console.log("Token:", sessionStorage.getItem("jwt"));
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
        <div className="recipe-closeup-page">
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

                <Container className="px-0">
                    <h3>Nutrition information per serving:</h3>

                    <Row className="g-0">

                        <Col xs={6}>
                            <p>Calories:</p>
                        </Col>
                        <Col xs={6}>
                            <p>
                                {recipe.caloriesPerServing
                                    ? Number(recipe.caloriesPerServing).toFixed(1)
                                    : "No information found"}
                            </p>
                        </Col>
                    </Row>

                    <Row className="g-0">

                        <Col xs={6}>
                            <p>Protein:</p>
                        </Col>
                        <Col xs={6}>
                            <p>
                                {recipe.proteinPerServing
                                    ? Number(recipe.proteinPerServing).toFixed(1)
                                    : "No information found"}
                            </p>
                        </Col>
                    </Row>

                    <Row className="g-0">

                        <Col xs={6}>
                            <p>Carbohydrates:</p>
                        </Col>
                        <Col xs={6}>
                            <p>
                                {recipe.carbsPerServing
                                    ? Number(recipe.carbsPerServing).toFixed(1)
                                    : "No information found"}
                            </p>
                        </Col>
                    </Row>

                    <Row className="g-0">

                        <Col xs={6}>
                            <p>Fat:</p>
                        </Col>
                        <Col xs={6}>
                            <p>
                                {recipe.fatPerServing
                                    ? Number(recipe.fatPerServing).toFixed(1)
                                    : "No information found"}
                            </p>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col>
                            <p className="text-muted">
                                Nutrition values aren't accurate. The free version of the API uses 100g of an
                                ingredient,
                                no matter which quantity is specified.
                            </p>
                        </Col>
                    </Row>
                </Container>


                <div className="d-flex gap-2 mb-2">
                    {isOwner && (
                        <PrimaryButton onClick={handleUpdate}>
                            Update
                        </PrimaryButton>
                    )}

                    {isOwner && (
                        <PrimaryButton onClick={handleShowDelete}>
                            Delete
                        </PrimaryButton>
                    )}


                    <Modal show={showDelete} onHide={handleCloseDelete}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete recipe</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Do you really want to delete the recipe "{recipe.title}"?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="d-flex gap-2 mb-2">
                                <PrimaryButton onClick={handleCloseDelete}>
                                    Close
                                </PrimaryButton>
                                <PrimaryButton onClick={handleDelete}>
                                    Delete
                                </PrimaryButton>
                            </div>
                        </Modal.Footer>
                    </Modal>


                </div>


            </div>
        </div>
    );
}

export default RecipeCloseup;
