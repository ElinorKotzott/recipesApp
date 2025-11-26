import PrimaryButton from "./buttons/PrimaryButton.js";
import IngredientsDropdownMenu from "./IngredientsDropdownMenu";
import UnitDropdownMenu from "./UnitDropdownMenu";
import TagDropdownMenu from "./TagDropdownMenu";
import DifficultyDropdownMenu from "./DifficultyDropdownMenu";
import {useState} from "react";
import {Form} from "react-bootstrap";
import DarkButton from "./buttons/DarkButton";
import Modal from "react-bootstrap/Modal";
import ManageImageCropper from "./ManageImageCropper";


function Create({
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
                    imageType,
                    setImageData,
                    setImageType,
                    recipeIngredientList,
                    addIngredient,
                    removeIngredient,
                    tempRecipeIngredientList,
                    setTempRecipeIngredientList,
                    saveRecipeIngredientList,
                    tempStepListUI,
                    setTempStepListUI,
                    saveStepListUI,
                    allIngredients,
                    tagList,
                    setTagList,
                    allTags,
                    units,
                    stepListUI,
                    addStep,
                    removeStep,
                    allDifficulties,
                    difficulty,
                    setDifficulty,
                    servings,
                    setServings,
                    isUpdate,
                    cropParams,
                    setCropParams
                }) {

    const [selectedIngredient, setSelectedIngredient] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("");
    const [stepInput, setStepInput] = useState("");
    const [quantity, setQuantity] = useState(0);

    const [showIngredients, setShowIngredients] = useState(false);
    const handleShowIngredients = () => {
        setTempRecipeIngredientList(recipeIngredientList);
        setShowIngredients(true);
    };
    const handleCloseIngredients = () => setShowIngredients(false);

    const [showSteps, setShowSteps] = useState(false);
    const handleShowSteps = () => {
        setTempStepListUI(stepListUI);
        setShowSteps(true);
    };
    const handleCloseSteps = () => setShowSteps(false);

    const handleSaveIngredients = () => {
        if (tempRecipeIngredientList.length === 0) {
            alert("No ingredients added!");
            return;
        }
        saveRecipeIngredientList();
        setShowIngredients(false);
    };

    const handleSaveSteps = () => {
        if (tempStepListUI.length === 0) {
            alert("No steps added!");
            return;
        }
        saveStepListUI();
        setShowSteps(false);
    };

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

    const handleAddStep = () => {
        if (!stepInput) {
            alert("Please add text to your step before adding!");
            return;
        }

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

            <div>
                <div className="button-container">
                    <PrimaryButton className="w-100" onClick={handleShowIngredients}>
                        Ingredients
                    </PrimaryButton>
                </div>

                <Modal show={showIngredients} onHide={handleCloseIngredients}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add ingredients</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="ingredients">
                            <Form.Label className="me-2">Ingredients</Form.Label>

                            <Form.Group className="mb-3" controlId="ingredients">
                                <Form.Control
                                    type="number"
                                    min={1}
                                    placeholder="Quantity"
                                    className="input-for-numbers"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                />

                                <UnitDropdownMenu
                                    selectedUnit={selectedUnit}
                                    onChange={setSelectedUnit}
                                    units={units}
                                />

                                <IngredientsDropdownMenu
                                    selectedIngredient={selectedIngredient}
                                    onChange={setSelectedIngredient}
                                    ingredients={allIngredients}
                                />

                                <PrimaryButton
                                    className="mt-2 add-or-remove-button"
                                    onClick={handleAddIngredient}
                                >
                                    +
                                </PrimaryButton>
                            </Form.Group>

                            <ul className="mt-2">
                                {tempRecipeIngredientList?.map((item, index) => (
                                    <li key={index}>
                                        {item.quantity}{" "}
                                        {item.unit === "WHOLE" ? "" : item.unit.toLowerCase()}{" "}
                                        {item.ingredient.name.toLowerCase()}
                                        <DarkButton
                                            size="sm"
                                            className="ms-2 add-or-remove-button"
                                            onClick={() => handleRemoveIngredient(item.ingredient.id)}
                                        >
                                            -
                                        </DarkButton>
                                    </li>
                                ))}
                            </ul>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <PrimaryButton onClick={handleCloseIngredients}>
                            Close
                        </PrimaryButton>
                        <PrimaryButton onClick={handleSaveIngredients}>Save</PrimaryButton>
                    </Modal.Footer>
                </Modal>

                <ul className="mt-2">
                    {recipeIngredientList?.map((item, index) => (
                        <li key={index}>
                            {item.quantity}{" "}
                            {item.unit === "WHOLE" ? "" : item.unit.toLowerCase()}{" "}
                            {item.ingredient.name.toLowerCase()}
                        </li>
                    ))}
                </ul>

                <div>
                    <div className="button-container">
                        <PrimaryButton className="w-100" onClick={handleShowSteps}>
                            Steps
                        </PrimaryButton>
                    </div>

                    <Modal show={showSteps} onHide={handleCloseSteps}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add steps</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="steps">
                                <Form.Label>Steps</Form.Label>

                                <div>
                                    <p className="mb-0">{tempStepListUI.length + 1}.</p>

                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        className="w-50"
                                        value={stepInput}
                                        onChange={(e) => setStepInput(e.target.value)}
                                    />

                                    <PrimaryButton
                                        onClick={handleAddStep}
                                        className="add-or-remove-button"
                                    >
                                        +
                                    </PrimaryButton>
                                </div>

                                <ol className="mt-2">
                                    {tempStepListUI?.map((step, index) => (
                                        <li key={index}>
                                            {step.instructionText}
                                            <DarkButton
                                                size="sm"
                                                className="ms-2 add-or-remove-button"
                                                onClick={() => handleRemoveStep(step)}
                                            >
                                                -
                                            </DarkButton>
                                        </li>
                                    ))}
                                </ol>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <PrimaryButton onClick={handleCloseSteps}>Close</PrimaryButton>
                            <PrimaryButton onClick={handleSaveSteps}>Save</PrimaryButton>
                        </Modal.Footer>
                    </Modal>

                    <ol className="mt-2">
                        {stepListUI?.map((step, index) => (
                            <li key={index}>{step.instructionText}</li>
                        ))}
                    </ol>
                </div>

                <div>
                    <Form.Group className="mb-3" controlId="tags">
                        <Form.Label>Tags</Form.Label>

                        <div className="w-50">
                            <TagDropdownMenu
                                selectedTags={tagList}
                                onChange={setTagList}
                                tags={allTags}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <div>
                            <Form.Label>Preparation Time (mins)</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                className="input-for-numbers"
                                value={prepTime}
                                onChange={(e) => setPrepTime(Number(e.target.value))}
                            />
                        </div>

                        <div>
                            <Form.Label>Cooking Time (mins)</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                className="input-for-numbers"
                                value={cookingTime}
                                onChange={(e) => setCookingTime(Number(e.target.value))}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="difficulty">
                        <Form.Label>Difficulty</Form.Label>
                        <div className="w-50">
                            <DifficultyDropdownMenu
                                selectedDifficulty={difficulty}
                                onChange={setDifficulty}
                                difficulties={allDifficulties}
                            />
                        </div>
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

                    <ManageImageCropper
                        imageData={imageData}
                        imageType={imageType}
                        setImageData={setImageData}
                        setImageType={setImageType}
                        cropParams={cropParams}
                        setCropParams={setCropParams}
                        aspect={3 / 4}
                        cropShape="rect"
                        imageStyle={{width: "200px", margin: "1rem 0", display: "block"}}
                        labelName="Recipe Image"
                    />

                    <PrimaryButton type="submit">
                        {isUpdate ? "Update" : "Create"}
                    </PrimaryButton>
                </div>
            </div>
        </Form>
    );
}

export default Create;
