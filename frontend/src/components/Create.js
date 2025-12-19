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
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


function Create({
                    recipe,
                    setRecipe,
                    handleSubmit,
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
                    isUpdate,
                    isClicked
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

    const updateRecipe = (key, value) => {
        setRecipe(prev => ({
            ...prev,
            [key]: value,
        }));
    };


    return (
        <div className="create-page">
            <Form className="create-container" onSubmit={handleSubmit}>
                <h2>{isUpdate ? "Update Recipe" : "Create New Recipe"}</h2>
                <Row>

                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={recipe.title}
                                onChange={(e) => updateRecipe("title", e.target.value)}
                            />
                        </Form.Group>
                    </Col>


                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Preparation Time (min)</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                value={recipe.prepTime}
                                onChange={(e) => updateRecipe("prepTime", Number(e.target.value))}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Cooking Time (min)</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                value={recipe.cookingTime}
                                onChange={(e) => updateRecipe("cookingTime", Number(e.target.value))}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={recipe.description}
                                onChange={(e) => updateRecipe("description", e.target.value)}
                            />
                        </Form.Group>

                    </Col>
                    <Col md={3}>
                        <Form.Group className="mb-3" controlId="tags">
                            <Form.Label>Tags</Form.Label>

                            <TagDropdownMenu
                                selectedTags={tagList}
                                onChange={setTagList}
                                tags={allTags}
                            />
                        </Form.Group>

                    </Col>

                    <Col md={3}>
                        <Form.Group className="mb-3" controlId="difficulty">
                            <Form.Label>Difficulty</Form.Label>
                            <DifficultyDropdownMenu
                                selectedDifficulty={recipe.difficulty}
                                onChange={(value) => updateRecipe("difficulty", value)}
                                difficulties={allDifficulties}
                            />
                        </Form.Group>
                    </Col>
                </Row>


                <Row>

                    <Col md={3}>
                        <h5>Ingredient list</h5>
                        <PrimaryButton className="mt-2 mb-3 w-100" onClick={handleShowIngredients}>
                            Add Ingredients
                        </PrimaryButton>
                    </Col>

                    <Col md={3}></Col>

                    <Col md={3}>
                        <h5>Instructions</h5>
                        <PrimaryButton className="mt-2 mb-3 w-100" onClick={handleShowSteps}>
                            Add Steps
                        </PrimaryButton>
                    </Col>
                </Row>

                <Row>

                    <Col>
                        <ul>
                            {recipeIngredientList?.map((item, index) => (
                                <li key={index}>
                                    {item.quantity}{" "}
                                    {item.unit === "WHOLE" ? "" : item.unit.toLowerCase()}{" "}
                                    {item.ingredient.name.toLowerCase()}
                                </li>
                            ))}
                        </ul>
                    </Col>

                    <Col>
                        <ol>
                            {stepListUI?.map((step, index) => (
                                <li key={index}>{step.instructionText}</li>
                            ))}
                        </ol>
                    </Col>

                </Row>

                <Row>
                    <Col md={3}>
                        <Form.Group className="mb-3" controlId="servings">
                            <Form.Label>Servings</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                className="input-for-numbers"
                                value={recipe.servings}
                                onChange={(e) => updateRecipe("servings", Number(e.target.value))}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <ManageImageCropper
                            imageOwner={recipe}
                            imageData={recipe.imageData}
                            imageType={recipe.imageType}
                            setImageData={(value) => setRecipe(prev => ({...prev, imageData: value}))}
                            setImageType={(value) => setRecipe(prev => ({...prev, imageType: value}))}
                            cropParameters={recipe.cropParameters}
                            setCropParameters={(value) => setRecipe(prev => ({...prev, cropParameters: value}))}
                            aspect={3 / 4}
                            cropShape="rect"
                            imageStyle={{width: "100%", margin: "1rem 0", display: "block"}}
                            labelName="Recipe Image"
                            labelClassName="mb-2"
                            onSaveImage={(imageObj) => updateRecipe("image", imageObj)}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <PrimaryButton disabled={isClicked} className="mt-3 w-100" type="submit">
                            {isUpdate ? "Update" : "Create"}
                        </PrimaryButton>
                    </Col>
                </Row>


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

                                <DarkButton
                                    className="mt-2 add-or-remove-button"
                                    onClick={handleAddIngredient}
                                >
                                    +
                                </DarkButton>
                            </Form.Group>

                            <ul className="mt-2">
                                {tempRecipeIngredientList?.map((item, index) => (
                                    <li key={index}>
                                        {item.quantity}{" "}
                                        {item.unit === "WHOLE" ? "" : item.unit.toLowerCase()}{" "}
                                        {item.ingredient.name.toLowerCase()}
                                        <DarkButton
                                            className="add-or-remove-button"
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
                        <div className="d-flex gap-2 mb-2">
                            <PrimaryButton onClick={handleCloseIngredients}>
                                Close
                            </PrimaryButton>
                            <PrimaryButton onClick={handleSaveIngredients}>
                                Save
                            </PrimaryButton>
                        </div>
                    </Modal.Footer>
                </Modal>


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

                                <DarkButton
                                    onClick={handleAddStep}
                                    className="mt-2 add-or-remove-button"
                                >
                                    +
                                </DarkButton>
                            </div>

                            <ol className="mt-2">
                                {tempStepListUI?.map((step, index) => (
                                    <li key={index}>
                                        {step.instructionText}
                                        <DarkButton
                                            size="sm"
                                            className="add-or-remove-button"
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

            </Form>
        </div>
    );
}

export default Create;
