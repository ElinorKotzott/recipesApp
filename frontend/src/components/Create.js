import SubmitButton from './SubmitButton.js';
import IngredientsDropdownMenu from './IngredientsDropdownMenu';
import UnitDropdownMenu from './UnitDropdownMenu';
import { useState } from 'react';

const Create = ({
    title,
    setTitle,
    description,
    setDescription,
    prepTime,
    setPrepTime,
    cookingTime,
    setCookingTime,
    handleSubmit,
    imageData,
    setImageData,
    imageType,
    setImageType,
    ingredientsList,
    addIngredient,
    allIngredients,
    units,
    method,
    setMethod,
    servings,
    setServings,
    isUpdate
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

    const [selectedIngredient, setSelectedIngredient] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("");
    const [quantity, setQuantity] = useState(0);

    const handleAddIngredient = () => {
        if (!selectedIngredient || !selectedUnit || quantity <= 0) {
            alert("Ingredient, quantity or unit missing!");
            return;
        }
        addIngredient(selectedIngredient, quantity, selectedUnit);
        setSelectedIngredient("");
        setSelectedUnit("");
        setQuantity(0);
    };


    return (
        <div className="create-container">
            <h2>{isUpdate ? 'Update Recipe' : 'Create New Recipe'}</h2>
            <form onSubmit={handleSubmit}>

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

                <SubmitButton type="submit">
                    {isUpdate ? 'Update' : 'Create'}
                </SubmitButton>
            </form>

            <label htmlFor="ingredient">Add Ingredient</label>
                            <IngredientsDropdownMenu
                                selectedIngredient={selectedIngredient}
                                onChange={setSelectedIngredient}
                                ingredients={allIngredients}
                            />

                            <input
                                type="number"
                                min="1"
                                placeholder="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />

                            <UnitDropdownMenu
                                selectedUnit={selectedUnit}
                                onChange={setSelectedUnit}
                                units={units}
                            />

                            <SubmitButton onClick={handleAddIngredient}>Add Ingredient</SubmitButton>

                            <ul>
                              {ingredientsList.map((item, index) => (
                                <li key={index}>
                                  {item.quantity} {item.unit === "WHOLE" ? "" : item.unit.toLowerCase()} {item.ingredient.name}
                                </li>
                              ))}
                            </ul>


        </div>
    );
};

export default Create;

