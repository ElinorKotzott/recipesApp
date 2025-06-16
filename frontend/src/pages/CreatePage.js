import React, { useState } from 'react';
import { request } from '../axiosHelper';
import Create from '../components/Create';


const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [prepTime, setPrepTime] = useState(0);
    const [cookingTime, setCookingTime] = useState(0);
    const [image, setImage] = useState("");
    const token = sessionStorage.getItem('token');

    if (!token) {
            return <p>You must be logged in to view this page!</p>;
        }

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await request('post', '/create', { title, description, prepTime, cookingTime, image }, true);
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
            image={image}
            setImage={setImage}
            handleCreate={handleCreate}/>
    );
}

export default CreatePage;
