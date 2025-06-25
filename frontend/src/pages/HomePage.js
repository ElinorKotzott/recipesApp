import { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import Recipe from '../components/Recipe';
import { request } from '../axiosHelper';

function HomePage () {
    const [allRecipes, setAllRecipes] = useState([]);
    const [userRecipes, setUserRecipes] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            return;
            }
        const fetchData = async () => {
            try {
                const results = await Promise.all([
                request('get', '/recipes?page=0&size=20', null, true),
                request('get', '/recipes/mine?page=0&size=20', null, true)
                ]);

                const allResults = results[0];
                const userResults = results[1];

                setAllRecipes(allResults.data.recipes);
                setUserRecipes(userResults.data.recipes);

            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <LogoutButton />
            <Recipe allRecipes={allRecipes} userRecipes={userRecipes} />
        </>
    );
}

export default HomePage;

