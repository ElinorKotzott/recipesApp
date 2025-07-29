import { useEffect, useState } from 'react';
import { request } from '../axiosHelper';
import Create from '../components/Create';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [prepTime, setPrepTime] = useState(0);
    const [cookingTime, setCookingTime] = useState(0);
    const [imageData, setImageData] = useState("");
    const [imageType, setImageType] = useState("");
    const [ingredientsList, setIngredientsList] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);
    const [units, setUnits] = useState([]);
    const [method, setMethod] = useState("");
    const [servings, setServings] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ingredientsResponse, unitsResponse] = await Promise.all([
                    request('get', '/ingredients', null, true),
                    request('get', '/units', null, true),
                ]);
                setAllIngredients(ingredientsResponse.data);
                setUnits(unitsResponse.data);
            } catch (error) {
                console.error('Failed to load ingredients or units:', error);
            }
        };
        fetchData();
    }, []);

    const addIngredient = (ingredientId, quantity, unit) => {
        const ingredient = allIngredients.find(i => i.id === parseInt(ingredientId));
        setIngredientsList(myPreviousList => [...myPreviousList, { ingredient, quantity, unit }]);
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        const recipeIngredientDTOList = ingredientsList.map(item => ({
            ingredientDTO: {
                id: item.ingredient.id,
                name: item.ingredient.name
            },
            quantity: item.quantity,
            unit: item.unit
        }));

        try {
            await request('post', '/recipes', {
                title,
                description,
                prepTime,
                cookingTime,
                imageData,
                imageType,
                recipeIngredientDTOList,
                method,
                servings
            }, true);
            navigate('/home');
            alert('Recipe created successfully!');
        } catch (error) {
            if (error.response) {
                alert('Submission failed: ' + error.response.data.message);
            } else {
                alert('Error: ' + error.message);
            }
        }
    };


    return (
        <Create
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            prepTime={prepTime}
            setPrepTime={setPrepTime}
            cookingTime={cookingTime}
            setCookingTime={setCookingTime}
            handleCreate={handleCreate}
            imageData={imageData}
            setImageData={setImageData}
            imageType={imageType}
            setImageType={setImageType}
            ingredientsList={ingredientsList}
            addIngredient={addIngredient}
            allIngredients={allIngredients}
            units={units}
            method={method}
            setMethod={setMethod}
            servings={servings}
            setServings={setServings}
        />
    );
};

export default CreatePage;
