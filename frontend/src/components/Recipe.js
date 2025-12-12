import {Link} from "react-router-dom";
import ToggleFavoritesButton from "./buttons/ToggleFavoritesButton";
import Pagination from "./Pagination";
import DrawImage from "./DrawImage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Recipe({
                    allRecipes,
                    setAllRecipes,
                    allCurrentPage,
                    allTotalPages,
                    fetchAllRecipes,

                    userRecipes,
                    setUserRecipes,
                    userCurrentPage,
                    userTotalPages,
                    fetchUserRecipes,
                }) {

    const handleFavoriteToggle = (recipeId) => (newFavoriteState) => {
        const updateFavoriteStatus = (recipes) =>
            recipes.map((recipe) =>
                recipe.id === recipeId ? {...recipe, favorite: newFavoriteState} : recipe
            );

        setAllRecipes((prev) => updateFavoriteStatus(prev));
        setUserRecipes((prev) => updateFavoriteStatus(prev));
    };

    return (
        <Container className="recipe-card-section-container">

            <div className="recipe-card-section">
                <h2>Latest Uploads</h2>

                {allRecipes.length === 0 ? (
                    <p>Nothing to see here yet.</p>
                ) : (
                    <Row>
                        {allRecipes.map(recipe => (
                            <Col key={recipe.id} xs={12} sm={6} md={4} lg={3}>
                                <div className="recipe-card">
                                    <div className="favorite-button-container">
                                        <Link to={`/recipes/${recipe.id}`}>
                                            {recipe.image?.imageData ? (
                                                <DrawImage
                                                    imageData={recipe.image.imageData}
                                                    imageType={recipe.image.imageType}
                                                    cropParameters={recipe.image.cropParameters}
                                                    imageStyle={{
                                                        display: "block",
                                                        width: "100%",
                                                        aspectRatio: 3 / 4,
                                                        objectFit: "cover",
                                                        margin: "1rem 0"
                                                    }}
                                                    className="recipe-card-image"
                                                />
                                            ) : (
                                                <img
                                                    className="recipe-card-image"
                                                    alt={recipe.title}
                                                    src="/image-placeholder.jpeg"
                                                    style={{
                                                        display: "block",
                                                        width: "100%",
                                                        objectFit: "cover",
                                                        margin: "1rem 0"
                                                    }}
                                                />
                                            )}
                                        </Link>

                                        <ToggleFavoritesButton
                                            className="favorite-button"
                                            recipeId={recipe.id}
                                            initialIsFavorite={recipe.favorite}
                                            onToggle={handleFavoriteToggle(recipe.id)}
                                        />
                                    </div>

                                    <h3>
                                        <Link to={`/recipes/${recipe.id}`} className="card-link">
                                            {recipe.title}
                                        </Link>
                                    </h3>

                                    <p>{recipe.description}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}

                <Pagination
                    currentPage={allCurrentPage}
                    totalPages={allTotalPages}
                    fetchRecipes={fetchAllRecipes}
                />
            </div>


            <div className="recipe-card-section">
                <h2>Your Recipes</h2>

                {userRecipes.length === 0 ? (
                    <p>You haven't created any recipes yet.</p>
                ) : (
                    <Row className="g-4">
                        {userRecipes.map(recipe => (
                            <Col key={recipe.id} xs={12} sm={6} md={4} lg={3}>
                                <div className="recipe-card">
                                    <div className="favorite-button-container">
                                        <Link to={`/recipes/${recipe.id}`}>
                                            {recipe.image?.imageData ? (
                                                <DrawImage
                                                    imageData={recipe.image.imageData}
                                                    imageType={recipe.image.imageType}
                                                    cropParameters={recipe.image.cropParameters}
                                                    imageStyle={{
                                                        display: "block",
                                                        width: "100%",
                                                        aspectRatio: 3 / 4,
                                                        objectFit: "cover",
                                                        margin: "1rem 0"
                                                    }}
                                                    className="recipe-card-image"
                                                />
                                            ) : (
                                                <img
                                                    className="recipe-card-image"
                                                    alt={recipe.title}
                                                    src="/image-placeholder.jpeg"
                                                    style={{
                                                        display: "block",
                                                        width: "100%",
                                                        objectFit: "cover",
                                                        margin: "1rem 0"
                                                    }}
                                                />
                                            )}
                                        </Link>

                                        <ToggleFavoritesButton
                                            className="favorite-button"
                                            recipeId={recipe.id}
                                            initialIsFavorite={recipe.favorite}
                                            onToggle={handleFavoriteToggle(recipe.id)}
                                        />
                                    </div>

                                    <h3>
                                        <Link to={`/recipes/${recipe.id}`} className="card-link">
                                            {recipe.title}
                                        </Link>
                                    </h3>

                                    <p>{recipe.description}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}

                <Pagination
                    currentPage={userCurrentPage}
                    totalPages={userTotalPages}
                    fetchRecipes={fetchUserRecipes}
                />
            </div>

        </Container>
    );
}

export default Recipe;
