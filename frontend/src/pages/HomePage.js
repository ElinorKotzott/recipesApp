import { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import Recipe from '../components/Recipe';
import { request } from '../axiosHelper';

function HomePage () {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await request('get', '/recipes', null, true);
                setRecipes(response.data);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <>
            <LogoutButton />
            <Recipe recipes={recipes} />
        </>
    );
}

export default HomePage;

