import PrimaryButton from "./buttons/PrimaryButton.js";
import IngredientsDropdownMenu from "./IngredientsDropdownMenu";
import UnitDropdownMenu from "./UnitDropdownMenu";
import TagDropdownMenu from "./TagDropdownMenu";
import {useState} from "react";
import {Form, Button} from "react-bootstrap";
import DarkButton from "./buttons/DarkButton";

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
            alert("Tag not selected!");
            return;
        }
        addTag(selectedTag);
        setSelectedTag(null);
    };

    const handleRemoveTag = (tagId) => {
        removeTag(tagId);
    };

    const handleAddStep = () => {
        if (!stepInput)
            alert("Please add text to your step before adding!");
        return;

        addStep({instructionText: stepInput});
        setStepInput("");
    };

    const handleRemoveStep = (step) => {
        removeStep(step);
    };

    return (
        <Form className="create-container" onSubmit={handleSubmit}>
            <h2>{isUpdate ? "Update Recipe" : "Create New Recipe"}</h2>

            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    className="w-50"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    className="w-50"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="prepTime">
                <Form.Label>Preparation Time (mins)</Form.Label>
                <Form.Control
                    type="number"
                    min="0"
                    className="w-25"
                    value={prepTime}
                    onChange={(e) => setPrepTime(Number(e.target.value))}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="cookingTime">
                <Form.Label>Cooking Time (mins)</Form.Label>
                <Form.Control
                    type="number"
                    min="0"
                    className="w-25"
                    value={cookingTime}
                    onChange={(e) => setCookingTime(Number(e.target.value))}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageUpload">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    className="w-25"
                    onChange={handleImageChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="servings">
                <Form.Label>Servings</Form.Label>
                <Form.Control
                    type="number"
                    min="1"
                    className="w-25"
                    value={servings}
                    onChange={(e) => setServings(Number(e.target.value))}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ingredients">
                <Form.Label>Add Ingredient</Form.Label>
                <IngredientsDropdownMenu
                    selectedIngredient={selectedIngredient}
                    onChange={setSelectedIngredient}
                    className="w-25"
                    ingredients={allIngredients}
                />
                <Form.Control
                    type="number"
                    placeholder="Quantity"
                    className="mt-2 w-25"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <UnitDropdownMenu
                    selectedUnit={selectedUnit}
                    onChange={setSelectedUnit}
                    units={units}
                />
                <PrimaryButton className="mt-2" onClick={handleAddIngredient}>
                    Add Ingredient
                </PrimaryButton>
                <ul className="mt-2">
                    {ingredientsList?.map((item, index) => (
                        <li key={index}>
                            {item.quantity}{" "}
                            {item.unit === "WHOLE" ? "" : item.unit.toLowerCase()}{" "}
                            {item.ingredient.name}
                            <DarkButton
                                size="sm"
                                className="ms-2"
                                onClick={() => handleRemoveIngredient(item.ingredient.id)}
                            >
                                remove
                            </DarkButton>
                        </li>
                    ))}
                </ul>
            </Form.Group>

            <Form.Group className="mb-3" controlId="tags">
                <Form.Label>Add Tag</Form.Label>
                <TagDropdownMenu
                    selectedTag={selectedTag}
                    onChange={setSelectedTag}
                    tags={allTags}
                />
                <PrimaryButton className="mt-2" onClick={handleAddTag}>
                    Add Tag
                </PrimaryButton>
                <ul className="mt-2">
                    {tagsList?.map((tag) => (
                        <li key={tag.id}>
                            {tag.text}
                            <Button
                                variant="dark"
                                size="sm"
                                className="ms-2"
                                onClick={() => handleRemoveTag(tag.id)}
                            >
                                remove
                            </Button>
                        </li>
                    ))}
                </ul>
            </Form.Group>

            <Form.Group className="mb-3" controlId="steps">
                <Form.Label>Steps</Form.Label>
                <p>{stepsList.length + 1}.</p>
                <Form.Control
                    as="textarea"
                    rows={2}
                    className="w-50"
                    value={stepInput}
                    onChange={(e) => setStepInput(e.target.value)}
                />
                <PrimaryButton className="mt-2" onClick={handleAddStep}>
                    Add Step
                </PrimaryButton>
                <ol className="mt-2">
                    {stepsList?.map((step, index) => (
                        <li key={index}>
                            {step.instructionText}
                            <DarkButton
                                size="sm"
                                className="ms-2"
                                onClick={() => handleRemoveStep(step)}
                            >
                                remove
                            </DarkButton>
                        </li>
                    ))}
                </ol>
            </Form.Group>

            <PrimaryButton type="submit">
                {isUpdate ? "Update" : "Create"}
            </PrimaryButton>
        </Form>
    );
};

export default Create;
