import { useState } from 'react';
import { request } from '../axiosHelper';
import SubmitButton from './SubmitButton';

function ToggleFavoritesButton({ recipeId, initialIsFavorite }) {
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
    const token = sessionStorage.getItem('token');

    const toggleFavs = async () => {
        if (!token) {
            return;
        }

        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState);

        try {
            await request('put', `/favorites/${recipeId}`, { favorite: newFavoriteState }, true);
        } catch (error) {
            console.error('Error toggling favorite:', error);
            setIsFavorite(!newFavoriteState);
        }
    };

    return (
        <SubmitButton onClick={toggleFavs}>
            {isFavorite ? '❤️' : '🤍'}
        </SubmitButton>
    );
}

export default ToggleFavoritesButton;
