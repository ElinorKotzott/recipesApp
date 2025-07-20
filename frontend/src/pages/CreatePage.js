import { useState } from 'react';
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
    const [ingredients, setIngredients] = useState("");
    const [method, setMethod] = useState("");
    const [servings, setServings] = useState(0);
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await request('post', '/recipes', { title, description, prepTime, cookingTime, imageData, imageType, ingredients, method, servings }, true);
            navigate('/home');
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
            ingredients={ingredients}
            setIngredients={setIngredients}
            method={method}
            setMethod={setMethod}
            servings={servings}
            setServings={setServings}
        />
    );
}

export default CreatePage;
