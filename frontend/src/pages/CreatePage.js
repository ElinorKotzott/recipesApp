import { useState } from 'react';
import { request } from '../axiosHelper';
import Create from '../components/Create';


const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [prepTime, setPrepTime] = useState(0);
    const [cookingTime, setCookingTime] = useState(0);
    const [imageData, setImageData] = useState("");
    const [imageType, setImageType] = useState("");

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await request('post', '/create', { title, description, prepTime, cookingTime, imageData, imageType }, true);
            alert("Recipe submitted successfully!");
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
        />
    );
}

export default CreatePage;
