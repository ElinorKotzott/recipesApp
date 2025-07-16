//create component - input form for the user to create and submit their own recipe
import SubmitButton from './SubmitButton.js';

const Create = ({
    title,
    setTitle,
    description,
    setDescription,
    prepTime,
    setPrepTime,
    cookingTime,
    setCookingTime,
    handleCreate,
    imageData,
    setImageData,
    imageType,
    setImageType,
    ingredients,
    setIngredients,
    method,
    setMethod,
    servings,
    setServings
}) => {

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setImageData(base64String);
            setImageType(file.type);
        };

        reader.readAsDataURL(file);
    };


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

                <label htmlFor="ingredients">Ingredients</label>
                <textarea
                    id="ingredients"
                    value={ingredients}
                    required
                    onChange={(e) => setIngredients(e.target.value)}
                />

                <label htmlFor="method">Method</label>
                <textarea
                    id="method"
                    value={method}
                    required
                    onChange={(e) => setMethod(e.target.value)}
                />

                <label htmlFor="prepTime">Preparation Time (mins)</label>
                <input
                    type="number"
                    min="0"
                    id="prepTime"
                    value={prepTime}
                    required
                    onChange={(e) => setPrepTime(Number(e.target.value))}
                />

                <label htmlFor="cookingTime">Cooking Time (mins)</label>
                <input
                    type="number"
                    min="0"
                    id="cookingTime"
                    value={cookingTime}
                    required
                    onChange={(e) => setCookingTime(Number(e.target.value))}
                />

                <label htmlFor="image">Image</label>
                    <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <label htmlFor="servings">Servings</label>
                    <input
                    type="number"
                    min="1"
                    id="servings"
                    value={servings}
                    required
                    onChange={(e) => setServings(Number(e.target.value))}
                />

                <SubmitButton type="submit">Create</SubmitButton>
            </form>
        </div>
    );
};

export default Create;

