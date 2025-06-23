import { useState, useEffect } from 'react';
import { request } from '../axiosHelper';

function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {

            const fetchFavorites = async () => {
                if (!token) return;
                try {
                    const response = await request('get', '/favorites', null, true);
                    const favorites = response.data;
                    setFavorites(favorites);

                } catch (error) {
                    console.error('Error fetching favs:', error);
                }
            };

            fetchFavorites();
        }, [token]);


    return (
            <div id="favs-container">
                <h2>Your Favorite Recipes</h2>
                {favorites.length === 0 ? (
                    <p>You haven't added any recipes to your favorites yet.</p>
                ) : (
                    <ul>
                        {favorites.map(recipe => (
                            <li key={recipe.id}>
                                <h3>{recipe.title}</h3>
                                <p>{recipe.description}</p>
                                <p>{recipe.tags}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
}

export default FavoritesPage;