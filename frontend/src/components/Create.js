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
    image,
    setImage
}) => {

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setImage({
                data: base64String,
                type: file.type
            });
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


                <label htmlFor="prepTime">Preparation Time (mins)</label>
                <input
                    type="number"
                    min="0"
                    id="prepTime"
                    value={prepTime}
                    required
                    onChange={(e) => setPrepTime(e.target.value)}
                />


                <label htmlFor="cookingTime">Cooking Time (mins)</label>
                <input
                    type="number"
                    min="0"
                    id="cookingTime"
                    value={cookingTime}
                    required
                    onChange={(e) => setCookingTime(e.target.value)}
                />

                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    id="image"
                    value={image}
                    required
                    onChange={(e) => setImage(e.target.value)}
                />

                <label htmlFor="image">Profile Picture</label>
                    <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <SubmitButton>Create</SubmitButton>
            </form>
        </div>
    );
};

export default Create;

