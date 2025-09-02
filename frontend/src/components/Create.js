import PrimaryButton from "./buttons/PrimaryButton.js";
import Button from 'react-bootstrap/Button';
import IngredientsDropdownMenu from "./IngredientsDropdownMenu";
import UnitDropdownMenu from "./UnitDropdownMenu";
import TagDropdownMenu from "./TagDropdownMenu";
import { useState } from "react";
import Form from 'react-bootstrap/Form';

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
  setImageData,
  setImageType,
  ingredientsList,
  addIngredient,
  removeIngredient,
  allIngredients,
  tagsList,
  addTag,
  removeTag,
  allTags,
  units,
  stepsList,
  addStep,
  removeStep,
  method,
  setMethod,
  servings,
  setServings,
  isUpdate,
}) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setImageData(base64String);
      setImageType(file.type);
    };

    reader.readAsDataURL(file);
  };

  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [stepInput, setStepInput] = useState("");
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

  const handleRemoveIngredient = (ingredientId) => {
    removeIngredient(ingredientId);
  };

  const handleAddTag = () => {
    if (!selectedTag) {
      alert("Tag not selected");
      return;
    }
    addTag(selectedTag);
    setSelectedTag(null);
  };

  const handleRemoveTag = (tagId) => {
    removeTag(tagId);
  };

  const handleAddStep = () => {
    if (!stepInput.trim()) return;

    addStep({ instructionText: stepInput });
    setStepInput("");
  };

  const handleRemoveStep = (step) => {
    removeStep(step);
  };

  return (
    <div className="create-container">
      <h2>{isUpdate ? "Update Recipe" : "Create New Recipe"}</h2>
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
          accept="image*//*"
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

        <PrimaryButton type="submit">
          {isUpdate ? "Update" : "Create"}
        </PrimaryButton>
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

      <PrimaryButton onClick={handleAddIngredient}>Add Ingredient</PrimaryButton>

      <ul>
        {ingredientsList?.map((item, index) => (
          <li key={index}>
            {item.quantity}{" "}
            {item.unit === "WHOLE" ? "" : item.unit.toLowerCase()}{" "}
            {item.ingredient.name}
            <Button
              variant="dark"
              className="button"
              onClick={() => handleRemoveIngredient(item.ingredient.id)}
            >
              remove
            </Button>
          </li>
        ))}
      </ul>

      <TagDropdownMenu
        selectedTag={selectedTag}
        onChange={setSelectedTag}
        tags={allTags}
      />

      <PrimaryButton onClick={handleAddTag}>Add Tag</PrimaryButton>

      <ul>
        {tagsList?.map((tag) => (
          <li key={tag.id}>
            {tag.text}
            <Button variant="dark" className="button" onClick={() => handleRemoveTag(tag.id)}>
              remove
            </Button>
          </li>
        ))}
      </ul>

      <label htmlFor="steps">Steps</label>
      <p id="currentStep">{stepsList.length + 1}.</p>
      <textarea
        id="steps"
        value={stepInput}
        onChange={(e) => setStepInput(e.target.value)}
      />

      <PrimaryButton onClick={handleAddStep}>Add Step</PrimaryButton>

      <ol>
        {stepsList?.map((step, index) => (
          <li key={index}>
            {step.instructionText}
            <Button variant="dark" className="button" onClick={() => handleRemoveStep(step)}>
              remove
            </Button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Create;
