//create component - input form for the user to create and submit their own recipe
import React from 'react';

const Create = ({
    title,
    setTitle,
    description,
    setDescription,
    prepTime,
    setPrepTime,
    cookingTime,
    setCookingTime,
    image,
    setImage,
    handleCreate
}) => {

    return (
        <div className="create-container">
            <h2>Create New Recipe</h2>
            <form onSubmit={handleCreate}>

                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />


                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                />


                <label htmlFor="prepTime">Preparation Time (mins)</label>
                <input
                    type="number"
                    id="prepTime"
                    value={prepTime}
                    required
                    onChange={(e) => setPrepTime(e.target.value)}
                />


                <label htmlFor="cookingTime">Cooking Time (mins)</label>
                <input
                    type="number"
                    id="cookingTime"
                    value={cookingTime}
                    required
                    onChange={(e) => setCookingTime(e.target.value)}
                />


                <label htmlFor="image">Image URL</label>
                <input
                    type="text"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />

                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default Create;
