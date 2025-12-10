import {useEffect, useState} from "react";
import {request} from "../../axiosHelper";
import Button from 'react-bootstrap/Button';


function ToggleFavoritesButton({
                                   recipeId,
                                   initialIsFavorite,
                                   className,
                                   onToggle,
                               }) {
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        setIsFavorite(initialIsFavorite);
    }, [initialIsFavorite]);

    const toggleFavs = async (e) => {
        e.stopPropagation();
        if (!token) {
            return;
        }
        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState);

        try {
            await request(
                "put",
                `/favorites/${recipeId}`,
                {favorite: newFavoriteState},
                true
            );
            if (onToggle) {
                onToggle(newFavoriteState);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            setIsFavorite(!newFavoriteState);
        }
    };

    return (
        <Button variant="light" className={className} onClick={toggleFavs}>
            {isFavorite ? "❤️" : "🤍"}
        </Button>
    );
}

export default ToggleFavoritesButton;
