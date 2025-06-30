import { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import Recipe from '../components/Recipe';
import { request } from '../axiosHelper';


function HomePage() {
    const [allRecipes, setAllRecipes] = useState([]);
    const [userRecipes, setUserRecipes] = useState([]);

    const [allCurrentPage, setAllCurrentPage] = useState(0);
    const [allTotalPages, setAllTotalPages] = useState(0);

    const [userCurrentPage, setUserCurrentPage] = useState(0);
    const [userTotalPages, setUserTotalPages] = useState(0);

    const token = sessionStorage.getItem('token');


    const fetchAllRecipes = async (page = 0) => {
        if (!token) return;
        try {
            const response = await request('get', `/recipes?page=${page}&size=10`, null, true);
            setAllRecipes(response.data.recipes);
            setAllCurrentPage(response.data.currentPage);
            setAllTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching all recipes:', error);
        }
    };

    const fetchUserRecipes = async (page = 0) => {
        if (!token) return;
        try {
            const response = await request('get', `/recipes/mine?page=${page}&size=10`, null, true);
            setUserRecipes(response.data.recipes);
            setUserCurrentPage(response.data.currentPage);
            setUserTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching user recipes:', error);
        }
    };


    useEffect(() => {
        fetchAllRecipes(0);
        fetchUserRecipes(0);
    }, [token]);

    return (
        <>
            <LogoutButton />
            <Recipe
                allRecipes={allRecipes}
                allCurrentPage={allCurrentPage}
                allTotalPages={allTotalPages}
                fetchAllRecipes={fetchAllRecipes}

                userRecipes={userRecipes}
                userCurrentPage={userCurrentPage}
                userTotalPages={userTotalPages}
                fetchUserRecipes={fetchUserRecipes}
            />
        </>
    );
}

export default HomePage;

