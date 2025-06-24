import { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import Recipe from '../components/Recipe';
import { request } from '../axiosHelper';

function HomePage () {
    const [allRecipes, setAllRecipes] = useState([]);
    const [userRecipes, setUserRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const results = await Promise.all([
                request('get', '/api/recipes?page=0&size=5', null, true),
                request('get', '/api/recipes/mine?page=0&size=5', null, true)
            ]);

            const allResults = results[0];
            const userResults = results[1];

            setAllRecipes(allResults.data.recipes);
            setUserRecipes(userResults.data.recipes);
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

