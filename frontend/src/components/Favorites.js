import {Link} from "react-router-dom";
import ToggleFavoritesButton from "./buttons/ToggleFavoritesButton";
import Pagination from "./Pagination";
import DrawImage from "./DrawImage";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

function Favorites({
                       favorites,
                       fetchFavorites,
                       currentPage,
                       totalPages,
                   }) {
    const handleToggle = async (newFavoriteState) => {
        if (!newFavoriteState) {
            if (favorites.length === 1 && currentPage > 0) {
                await fetchFavorites(currentPage - 1);
            } else {
                await fetchFavorites(currentPage);
            }
        }
    };


    return (
        <div className="display-flex-column-center">
            <Container className="recipe-card-section-container m-0">
                <div className="recipe-card-section">
                    <h2>Your Favorites</h2>

                    {favorites.length === 0 ? (
                        <p>You haven't added any recipes to your favorites yet.</p>
                    ) : (
                        <Row>
                            {favorites.map(recipe => (
                                <Col key={recipe.id} xs={12} sm={6} md={3}>
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
                                                onToggle={handleToggle}
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
                        fetchRecipes={fetchFavorites}
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />

                </div>
            </Container>
        </div>
    );
}

export default Favorites;
