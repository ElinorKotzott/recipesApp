import {useEffect, useState} from "react";
import {request} from "../axiosHelper";
import Create from "../components/Create";
import {useNavigate, useParams} from "react-router-dom";

const UpdateRecipePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        title: "",
        description: "",
        prepTime: 0,
        cookingTime: 0,
        servings: 0,
        difficulty: "",
        image: {
            imageData: "",
            imageType: "",
            cropParameters: null,
        },
    });

    const [recipeIngredientList, setRecipeIngredientList] = useState([]);
    const [tempRecipeIngredientList, setTempRecipeIngredientList] = useState([]);
    const [stepListUI, setStepListUI] = useState([]);
    const [tempStepListUI, setTempStepListUI] = useState([]);
    const [tagList, setTagList] = useState([]);

    const [allIngredients, setAllIngredients] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [allDifficulties, setAllDifficulties] = useState([]);
    const [units, setUnits] = useState([]);

    // Load ingredients, units, tags, difficulties
    useEffect(() => {
        (async () => {
            try {
                const [ingredientsResponse, unitsResponse, tagsResponse, difficultiesResponse] =
                    await Promise.all([
                        request("get", "/ingredients", null, true),
                        request("get", "/units", null, true),
                        request("get", "/tags", null, true),
                        request("get", "/difficulty", null, true),
                    ]);
                setAllIngredients(ingredientsResponse.data);
                setUnits(unitsResponse.data);
                setAllTags(tagsResponse.data);
                setAllDifficulties(difficultiesResponse.data);
            } catch (error) {
                console.error(
                    "Failed to load ingredients, units, tags, or difficulties:",
                    error
                );
            }
        })();
    }, []);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await request("get", `/recipes/${id}`, null, true);
                const data = response.data;

                setRecipe({
                    title: data.title,
                    description: data.description,
                    prepTime: data.prepTime,
                    cookingTime: data.cookingTime,
                    servings: data.servings,
                    difficulty: data.difficulty,
                    image: data.image || {imageData: "", imageType: "", cropParameters: null},
                });

                setRecipeIngredientList(data.recipeIngredientList || []);
                setStepListUI(data.stepList || []);
                setTagList(data.tagList || []);
            } catch (error) {
                alert("Failed to load recipe");
                navigate(-1);
            }
        };

        fetchRecipe();
    }, [id, navigate]);

    const addIngredient = (ingredientId, quantity, unit) => {
        const ingredient = allIngredients.find(
            (i) => i.id === parseInt(ingredientId)
        );
        setTempRecipeIngredientList((prev) => [
            ...prev,
            {ingredient, quantity, unit},
        ]);
    };

    const removeIngredient = (ingredientId) => {
        setTempRecipeIngredientList((prev) =>
            prev.filter((item) => item.ingredient.id !== ingredientId)
        );
    };

    const saveRecipeIngredientList = () => {
        setRecipeIngredientList(tempRecipeIngredientList);
    };

    const addStep = (step) => {
        if (!step) {
            alert("Please add text to your step!");
            return;
        }
        setTempStepListUI((prev) => [...prev, step]);
    };

    const removeStep = (step) => {
        setTempStepListUI((prev) => prev.filter((s) => s !== step));
    };

    const saveStepsList = () => setStepListUI(tempStepListUI);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const stepList = stepListUI.map((step, i) => ({
            id: step.id,
            stepNumber: i + 1,
            instructionText: step.instructionText,
        }));

        const errors = [];
        if (!recipe.title.trim()) errors.push("Title is required!");
        if (!recipe.description.trim()) errors.push("Description is required!");
        if (recipe.prepTime <= 0) errors.push("Preparation time must be greater than 0!");
        if (recipe.cookingTime <= 0) errors.push("Cooking time must be greater than 0!");
        if (recipe.servings <= 0) errors.push("Servings must be at least 1!");
        if (recipeIngredientList.length === 0) errors.push("At least one ingredient is required!");
        if (stepList.length === 0) errors.push("At least one step is required!");
        if (!recipe.difficulty) errors.push("Please select a difficulty!");
        if (recipe.title.length > 30) errors.push("Title must be less than 30 characters long!");
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        try {
            await request("put", `/recipes/${id}`, {
                ...recipe,
                recipeIngredientList,
                tagList,
                stepList,
            }, true);

            alert("Recipe updated successfully!");
            navigate(`/recipes/${id}`);
        } catch (error) {
            if (error.response) {
                alert("Update failed: " + error.response.data.message);
            } else {
                alert("Error: " + error.message);
            }
        }
    };

    return (
        <Create
            recipe={recipe}
            setRecipe={setRecipe}
            handleSubmit={handleUpdate}
            recipeIngredientList={recipeIngredientList}
            tempRecipeIngredientList={tempRecipeIngredientList}
            setTempRecipeIngredientList={setTempRecipeIngredientList}
            stepListUI={stepListUI}
            tempStepListUI={tempStepListUI}
            setTempStepListUI={setTempStepListUI}
            saveStepListUI={saveStepsList}
            tagList={tagList}
            setTagList={setTagList}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            addStep={addStep}
            removeStep={removeStep}
            saveRecipeIngredientList={saveRecipeIngredientList}
            allIngredients={allIngredients}
            allTags={allTags}
            allDifficulties={allDifficulties}
            units={units}
            isUpdate={true}
        />
    );
};

export default UpdateRecipePage;
