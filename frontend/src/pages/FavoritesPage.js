import { useState, useEffect } from 'react';
import { request } from '../axiosHelper';
import Favorites from '../components/Favorites';

function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {

        const fetchFavorites = async () => {
            if (!token) return;
                try {
                    const response = await request('get', '/favorites?page=0&size=20', null, true);
                    const fetchedFavorites = response.data.recipes;
                    setFavorites(fetchedFavorites);

                } catch (error) {
                    console.error('Error fetching favs:', error);
                }
            };

            fetchFavorites();
        }, [token]);


    return (
            <>
                <Favorites favorites={favorites}/>
            </>
        );
}

export default FavoritesPage;